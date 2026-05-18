import { Part } from "src/catalog/part/part.interface";
import { ItemDetail } from "../item-detail";

export interface PartDetailNormalizer {
    normalize(data: unknown): ItemDetail;
}
