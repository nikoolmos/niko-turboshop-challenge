import { PartDataSourceFactory } from "src/part-data-source-factory/part-data-source-factory";
import { PartDataSource } from "src/part-data-source/part-data-source";

export class PartRequestHandler {
    private dataSources: Array<PartDataSource>;
    
    constructor() {
        this.dataSources = PartDataSourceFactory.createPartDataSources();    
    }

    public getAllCatalogs(page: string, limit: string) {
        const myPromisesArray: Array<any> = [];

        for(const datasource of this.dataSources) {
            myPromisesArray.push(datasource.getCatalog(page, limit));
        }

        const finalPromise = Promise.allSettled(myPromisesArray);

        return finalPromise;
    }
}
