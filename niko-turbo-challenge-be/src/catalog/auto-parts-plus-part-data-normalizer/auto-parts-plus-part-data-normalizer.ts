import { PartProviders } from "src/constants/part-providers-enum";
import { PartDataNormalizer } from "src/catalog/part-data-normalizer/part-data-normalizer.interface";
import { Part } from "src/catalog/part/part.interface";

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
            const modelsAndYears = this.extractModelsAndYears(part);
            partsList.push({
                id: part.oem_code,
                description: part.desc,
                picture: part.img_urls,
                price: part.unit_price,
                providers: [PartProviders.AUTO_PARTS_PLUS.toString()],
                qty: part.qty_available,
                sku: part.sku,
                title: part.title,
                brand: part.brand_name,
                year: modelsAndYears.years,
                model: modelsAndYears.models,
            });
        }

        return partsList;
    }


    private extractModelsAndYears(part: AutoPartsPlusCatalogItem) {
        const listofVehicles = part.fits_vehicles;
        const yearsRegex = /\d{4}-\d{4}/;
        const models: string[] = [];
        const years: { from: string, upTo: string }[] = [];

        for (const stringToParse of listofVehicles) {
            const chunks = stringToParse.split(yearsRegex)
            models.push(chunks[0]);

            const yearsChunk = yearsRegex.exec(stringToParse)!;

            const [from, upTo] = yearsChunk[0].split('-');

            years.push({ from, upTo });
        }

        return {
            models,
            years,
        };

    }
}
