interface endpointConfig {
    url: string;
    queryParams: Record<string, string>;
}

export class PartDataSource {

    private baseUrl: string;
    private catalogEndpoint: endpointConfig;
    private itemEndpoint: endpointConfig;
    private infoEndpoint: endpointConfig;

    constructor(baseUrl: string, catalogEndpoint: endpointConfig, itemEndpoint: endpointConfig, infoEndpoint: endpointConfig) {
        this.baseUrl = baseUrl;
        this.catalogEndpoint = catalogEndpoint;
        this.itemEndpoint = itemEndpoint;
        this.infoEndpoint = infoEndpoint;
    }

    public getCatalog(page: string, limit: string|) {

    }

    public getItem(sku: string) {}

    public getInfo() {}
}
