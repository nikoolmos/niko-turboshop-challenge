import { PartDataSourceFactory } from "src/part-data-source-factory/part-data-source-factory";
import { PartDataSource } from "src/part-data-source/part-data-source";
import { Part } from "src/part/part.interface";

export class PartRequestHandler {
    private dataSources: Array<PartDataSource>;

    constructor() {
        this.dataSources = PartDataSourceFactory.createPartDataSources();
    }

    public getAllCatalogs(page: string, limit: string) {
        const myPromisesArray = this.dataSources.map(
            datasource => datasource.getCatalog(page, limit)
        );

        return Promise.allSettled(myPromisesArray)
            .then(promises => {
                const parts: Part[] = [];

                for (const promise of promises) {
                    promise.status === 'fulfilled' && parts.push(...promise.value);
                }

                return parts;
            });
    }
}
