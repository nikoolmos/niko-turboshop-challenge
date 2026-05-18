import { ItemDetail } from "src/item-detail/interfaces/item-detail";
import { PartDetailNormalizer } from "src/item-detail/interfaces/part-detail-normalizer/part-detail-normalizer.interface";
import { RepuestosMaxItemDetailResponse } from "src/item-detail/interfaces/RepuestosMaxItemDetailResponse";

export class RepuestosMaxPartDetailNormalizer implements PartDetailNormalizer {

    normalize(data: unknown): ItemDetail {
            const theData = data as RepuestosMaxItemDetailResponse;
            const thePart = theData.resultado.productos[0];
            const result: ItemDetail = {
                partId: thePart.identificacion.sku,
                sku: thePart.identificacion.sku,
                oemCode: thePart.identificacion.codigoOEM,
                title: thePart.informacionBasica.nombre,
                desc: thePart.informacionBasica.descripcion,
                brandName: thePart.informacionBasica.marca.nombre,
                categoryName: thePart.informacionBasica.categoria.nombre,
                unitPrice: thePart.precio.valor,
                currencyCode: thePart.precio.moneda,
                qtyAvailable:thePart.inventario.cantidad,
                warehouseLocation: thePart.inventario.ubicacion.bodega,
                weightValue: thePart.caracteristicas.peso.valor,
                weightUnit: thePart.caracteristicas.peso.unidad,
                imgUrls: thePart.multimedia.imagenes.map(image => image.url),
                fitsVehicles: thePart.compatibilidad.vehiculos.map(vehicles => vehicles.modelo),
            };
    
            return result;
}
}
