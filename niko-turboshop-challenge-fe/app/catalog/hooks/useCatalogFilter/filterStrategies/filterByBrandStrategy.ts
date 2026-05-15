import { Part } from "@/app/catalog/interfaces/part";
import { FilterStrategy } from "./filterStrategy";

export class FilterByBrandStrategy implements FilterStrategy {
    private selectedBrands: string[];

    constructor(selectedBrands: string[]) {
        this.selectedBrands = selectedBrands;
    }

    execute(part: Part): boolean {
        return this.selectedBrands.includes(part.brand);
    }
}