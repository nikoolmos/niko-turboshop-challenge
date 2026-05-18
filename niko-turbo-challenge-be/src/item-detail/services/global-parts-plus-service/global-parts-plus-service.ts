import { GlobalPartsItemDetailResponse } from "src/item-detail/interfaces/GlobalPartsItemDetailResponse";
import { BaseService } from "../base-service/base-service";
import { NotFoundError } from "src/item-detail/errors/not-found-error/not-found-error";

export class GlobalPartsPlusService extends BaseService {
    constructor() {
        super();

        this.endpoint = '/api/globalparts/inventory/search';
    }
    
    public async getPartDetail(id: string): Promise<GlobalPartsItemDetailResponse> {
            this.queryParams = {
                partNumber: id
            };
    
            const res = await super.request() as GlobalPartsItemDetailResponse;

            if(res?.ResponseEnvelope?.Body?.SearchResults?.TotalCount === 0) {
                throw new NotFoundError();
            }

            return res;
        }
}
