import { Part } from "@/app/catalog/interfaces/part";
import { FilterStrategy } from "./filterStrategy";

export class FilterBySearchTermStrategy implements FilterStrategy {
    private searchTerm: string;

    constructor(searchTerm: string) {
        this.searchTerm = searchTerm;
    }

    execute(part: Part): boolean {
        return  RegExp(`(${this.searchTerm})+`, 'i').test(part.title);
    }

}
