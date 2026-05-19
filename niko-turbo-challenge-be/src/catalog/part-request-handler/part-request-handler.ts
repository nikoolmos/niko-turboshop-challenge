import { PartDataSourceFactory } from "../part-data-source-factory/part-data-source-factory";
import { PartDataSource } from "../part-data-source/part-data-source";
import { Part } from "../part/part.interface";

export class PartRequestHandler {
    private dataSources: Array<PartDataSource>;

    constructor() {
        this.dataSources = PartDataSourceFactory.createPartDataSources();
    }

    public async getAllCatalogs(page: string, limit: string) {
        const myPromisesArray = this.dataSources.map(
            datasource => datasource.getCatalog(page, limit)
        );

        const partsList = await Promise.allSettled(myPromisesArray)
            .then(promises => {
                const parts: Part[] = [];

                for (const promise of promises) {
                    promise.status === 'fulfilled' && parts.push(...promise.value);
                }

                return parts;
            });

        const limitAsNumber = parseInt(limit, 10);
        const pageAsNumber = parseInt(page, 10);
        let sliceStart = 0;
        let sliceEnd = limitAsNumber;

        if (pageAsNumber !== 1) {
            sliceStart = limitAsNumber * (pageAsNumber - 1);
            sliceEnd = limitAsNumber * pageAsNumber;
        }

        
        const pagesQty = Math.round(partsList.length / limitAsNumber);
        
        console.log('TOTAL PAGES', pagesQty);
        console.log('ARRAY LENGTH', partsList.length);
        console.log('LIMIT', limitAsNumber);
        console.log('SLICE START', sliceStart);
        console.log('SLICE END', sliceEnd);
        
        return {
            totalPages: pagesQty,
            currentPage: page,
            parts: partsList.slice(sliceStart, sliceEnd),
        };
    }

}
