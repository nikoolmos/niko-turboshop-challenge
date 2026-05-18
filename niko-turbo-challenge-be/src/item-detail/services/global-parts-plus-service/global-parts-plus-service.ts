import { GlobalPartsItemDetailResponse } from "src/item-detail/interfaces/GlobalPartsItemDetailResponse";
import { BaseService } from "../base-service/base-service";

export class GlobalPartsPlusService extends BaseService {
    constructor() {
        super();

        this.endpoint = '/api/globalparts/inventory/search';
    }
    
    public getPartDetail(id: string): GlobalPartsItemDetailResponse {
            this.queryParams = {
                partNumber: id
            };
    
            return super.request() as GlobalPartsItemDetailResponse;
        }
}
