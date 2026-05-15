import { Part } from "@/app/catalog/interfaces/part";
import { FilterStrategy } from "./filterStrategy";

export class FilterByYearFrom implements FilterStrategy {
    private yearFrom: number;

    constructor(yearFrom: string) {
        this.yearFrom = parseInt(yearFrom, 10);
    }

    execute(part: Part): boolean {
        return part.year.every(someYear => parseInt(someYear.from) >= this.yearFrom); 
    }
}