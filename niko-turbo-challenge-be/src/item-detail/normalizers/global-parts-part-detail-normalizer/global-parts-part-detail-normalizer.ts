import { AxiosResponse } from "axios";
import { GlobalPartsItemDetailResponse } from "src/item-detail/interfaces/GlobalPartsItemDetailResponse";
import { ItemDetail } from "src/item-detail/interfaces/item-detail";
import { PartDetailNormalizer } from "src/item-detail/interfaces/part-detail-normalizer/part-detail-normalizer.interface";

export class GlobalPartsPartDetailNormalizer implements PartDetailNormalizer {
    normalize(data: unknown): ItemDetail {
        const myData = data as AxiosResponse;
        const theData = myData.data as GlobalPartsItemDetailResponse;
        const thePart = theData.ResponseEnvelope.Body.SearchResults.Items[0];

        const result: ItemDetail = {
            partId: thePart.ItemHeader.ExternalReferences.SKU.Value,
            sku: thePart.ItemHeader.ExternalReferences.SKU.Value,
            oemCode: thePart.ItemHeader.ExternalReferences.OEM.Value,
            title: thePart.ProductDetails.NameInfo.DisplayName,
            desc: thePart.ProductDetails.Description.FullText,
            brandName: thePart.ProductDetails.BrandInfo.BrandName,
            categoryName: thePart.ProductDetails.CategoryInfo.PrimaryCategory.Name,
            unitPrice: thePart.PricingInfo.ListPrice.Amount,
            currencyCode: thePart.PricingInfo.ListPrice.CurrencyCode,
            qtyAvailable: thePart.AvailabilityInfo.QuantityInfo.AvailableQuantity,
            warehouseLocation: thePart.AvailabilityInfo.WarehouseInfo.PrimaryWarehouse.Name,
            weightValue: thePart.PhysicalAttributes.Weight.Value,
            weightUnit: thePart.PhysicalAttributes.Weight.Unit,
            imgUrls: thePart.MediaAssets.Images.map(image => image.ImageUrl),
            fitsVehicles: thePart.VehicleCompatibility.CompatibleVehicles.map(vehicle => vehicle.Model.Name)
        };

        return result;

    }
}
