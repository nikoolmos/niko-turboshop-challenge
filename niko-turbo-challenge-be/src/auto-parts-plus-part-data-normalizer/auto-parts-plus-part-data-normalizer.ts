import { PartDataNormalizer } from "src/part-data-normalizer/part-data-normalizer.interface";
import { Part } from "src/part/part.interface";

export interface AutoPartsPlusCatalogResponse {
    success: boolean;
    request_id: string;
    timestamp: Date;
    latency_ms: number;
    pagination: AutoPartsPlusCatalogResponsePagination;
    parts: AutoPartsPlusCatalogItem[];
}

export interface AutoPartsPlusCatalogResponsePagination {
    total_items: number;
    total_pages: number;
    current_page: number;
    items_per_page: number;
    has_next: boolean;
    has_prev: boolean;
}

export interface AutoPartsPlusCatalogItem {
    part_id: string;
    sku: string;
    oem_code: string;
    title: string;
    desc: string;
    brand_name: string;
    category_name: string;
    unit_price: number;
    currency_code: string;
    qty_available: number;
    warehouse_location: string;
    weight_value: number;
    weight_unit: string;
    img_urls: string[];
    fits_vehicles: string[];
    spec_keys: string[];
    spec_values: string[];
}

export class AutoPartsPlusPartDataNormalizer implements PartDataNormalizer<AutoPartsPlusCatalogResponse> {

    public normalizeCatalogData(catalogData: AutoPartsPlusCatalogResponse): Part[] {
        const partsList: Part[] = [];

        for (const part of catalogData.parts) {
            partsList.push({
                id: part.oem_code,
                description: part.desc,
                picture: part.img_urls,
                price: part.unit_price,
                providers: ['AutoPartsPlus'],
                qty: part.qty_available,
                sku: part.sku,
                title: part.title
            });
        }

        return partsList;
    }
}
