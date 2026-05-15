import { Part } from "@/app/catalog/interfaces/part";

export interface FilterStrategy {
    execute(part: Part):  boolean;
}