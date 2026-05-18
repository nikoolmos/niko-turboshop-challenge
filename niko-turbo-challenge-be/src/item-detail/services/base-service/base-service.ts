import axios, { query } from "axios";
import { URL } from "url";

export class BaseService {
    private providerBaseUrl: string;
    protected endpoint: string;
    protected queryParams: Record<string,string>;

    constructor() {
        this.providerBaseUrl = 'https://web-production-84144.up.railway.app';
        this.endpoint = '';
        this.queryParams = {};
    }

    protected async request(): Promise<unknown> {
        const url = new URL(this.providerBaseUrl + this.endpoint);

        for(const param in this.queryParams) {
            url.searchParams.set(param, this.queryParams[param]);
        }

        return axios.get(url.toString());
    }
}
