import { Part } from "src/catalog/part/part.interface";

export interface PartDataNormalizer<T> {
    normalizeCatalogData(catalogData: T): Part[];
}
