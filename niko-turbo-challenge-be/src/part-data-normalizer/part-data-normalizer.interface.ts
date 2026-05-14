import { Part } from "src/part/part.interface";

export interface PartDataNormalizer<T> {
    normalizeCatalogData(catalogData: T): Part[];
}
