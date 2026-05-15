import { Part } from "@/app/catalog/interfaces/part";
import { FilterStrategy } from "./filterStrategy";

export class FilterByModelStrategy implements FilterStrategy {
    private models: string[];

    constructor(models: string[]) {
        this.models = models;
    }

    execute(part: Part): boolean {
        return part.model?.some(partModel => {
            return this.models.includes(partModel);
        }) || false;
    }
}