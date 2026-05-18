import axios from 'axios';
import { PartDataNormalizer } from "src/catalog/part-data-normalizer/part-data-normalizer.interface";
import { Part } from 'src/catalog/part/part.interface';

interface endpointConfig {
    url: string;
    queryParams: Record<string, string | undefined>;
}

export class PartDataSource {

    private baseUrl: string;
    private catalogEndpoint: endpointConfig;
    private itemEndpoint: endpointConfig;
    private infoEndpoint: endpointConfig;
    private dataNormalizer: PartDataNormalizer<any>;

    constructor(baseUrl: string, catalogEndpoint: endpointConfig, itemEndpoint: endpointConfig, infoEndpoint: endpointConfig, partDataNormalizer: PartDataNormalizer<any>) {
        this.baseUrl = baseUrl;
        this.catalogEndpoint = catalogEndpoint;
        this.itemEndpoint = itemEndpoint;
        this.infoEndpoint = infoEndpoint;
        this.dataNormalizer = partDataNormalizer;
    }

    public async getCatalog(page: string, limit: string) {
        const res = await this.performGetCatalogRequest({ page, limit });

        let parts = this.dataNormalizer.normalizeCatalogData(res);

        return parts;
    }

    private async performGetCatalogRequest(queryParamsValues) {
        const url = new URL(this.baseUrl + this.catalogEndpoint.url);

        const { queryParams: queryParamsConfig } = this.catalogEndpoint;
        for(const queryParamRemoteKey in queryParamsConfig) {
            const queryParamLocalKey = queryParamsConfig[queryParamRemoteKey];
            if(queryParamLocalKey) {
                url.searchParams.append(queryParamRemoteKey, queryParamsValues[queryParamLocalKey]);
            }
        }
        
        const res = await axios.get(url.toString());

        if(res.status === 200 && res.statusText === 'OK') {
            return res.data;
        }
    
        throw new Error('ERROR GET CATALOG');
    }

    public async getItem(sku: string) { }

    public async getInfo() { }
}
