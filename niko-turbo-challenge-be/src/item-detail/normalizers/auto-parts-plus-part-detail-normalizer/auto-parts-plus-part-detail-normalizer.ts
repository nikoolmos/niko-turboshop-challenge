import { AutoPartsPlustemDetailResponse } from "src/item-detail/interfaces/AutoPartsPlustemDetailResponse";
import { ItemDetail } from "src/item-detail/interfaces/item-detail";
import { PartDetailNormalizer } from "src/item-detail/interfaces/part-detail-normalizer/part-detail-normalizer.interface";
import { Part } from "src/catalog/part/part.interface";
import type { AxiosResponse } from "axios";

export class AutoPartsPlusPartDetailNormalizer implements PartDetailNormalizer {

    normalize(data: unknown): ItemDetail {
        const myData = data as AxiosResponse;
        const theData = myData.data as AutoPartsPlustemDetailResponse;
        const thePart = theData.parts[0];

        const result: ItemDetail = {
            partId: thePart.part_id,
            sku: thePart.sku,
            oemCode: thePart.oem_code,
            title: thePart.title,
            desc: thePart.desc,
            brandName: thePart.brand_name,
            categoryName: thePart.category_name,
            unitPrice: thePart.unit_price,
            currencyCode: thePart.currency_code,
            qtyAvailable: thePart.qty_available,
            warehouseLocation: thePart.warehouse_location,
            weightValue: thePart.weight_value,
            weightUnit: thePart.weight_unit,
            imgUrls: thePart.img_urls,
            fitsVehicles: thePart.fits_vehicles,
        };

        return result;

    }
}
