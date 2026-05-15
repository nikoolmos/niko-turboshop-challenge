import { Part } from "@/app/catalog/interfaces/part";
import { FilterStrategy } from "./filterStrategy";

export class FilterByYearUpTo implements FilterStrategy {
    private yearUpTo: number;

    constructor(yearUpTo: string) {
        this.yearUpTo = parseInt(yearUpTo, 10);
    }

    execute(part: Part): boolean {
        return part.year.every(someYear => parseInt(someYear.from) <= this.yearUpTo); 
    }
}