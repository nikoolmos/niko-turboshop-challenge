import { AutoPartsPlustemDetailResponse } from "src/item-detail/interfaces/AutoPartsPlustemDetailResponse";
import { BaseService } from "../base-service/base-service";

export class AutoPartsPlusService extends BaseService {
    constructor() {
        super();

        this.endpoint = '/api/autopartsplus/parts';
    }

    
    public async getPartDetail(id: string): Promise<AutoPartsPlustemDetailResponse> {
        this.queryParams = {
            sku: id
        };

        return await super.request() as AutoPartsPlustemDetailResponse;
    }
}
