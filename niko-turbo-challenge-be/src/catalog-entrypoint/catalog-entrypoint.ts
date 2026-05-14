import { PartDataNormalizer } from "src/part-data-normalizer/part-data-normalizer";
import { PartRequestHandler } from "src/part-request-handler/part-request-handler";

export class CatalogEntrypoint {

    public static getPartsCatalog(page: string, limit: string) {
        const myPartRequestHandler = new PartRequestHandler();
        const partsData = myPartRequestHandler.getAllCatalogs(page, limit);

        const myPartDataNormalizer = new PartDataNormalizer();
        myPartDataNormalizer.normalizeCatalogData(partsData);
        
        
    }
}
