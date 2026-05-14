import { PartRequestHandler } from "src/part-request-handler/part-request-handler";

export class CatalogEntrypoint {

    public static getPartsCatalog(page: string, limit: string) {
        const myPartRequestHandler = new PartRequestHandler();
        return  myPartRequestHandler.getAllCatalogs(page, limit);
    }
}
