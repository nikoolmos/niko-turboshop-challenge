import { RepuestosMaxItemDetailResponse } from "src/item-detail/interfaces/RepuestosMaxItemDetailResponse";
import { BaseService } from "../base-service/base-service";

export class RepuestosMaxService extends BaseService {

    constructor() {
        super();

        this.endpoint = '/api/repuestosmax/productos';
    }

    public async getPartDetail(id: string): Promise<RepuestosMaxItemDetailResponse> {
            this.queryParams = {
                codigo: id
            };
    
            return await super.request() as RepuestosMaxItemDetailResponse;
        }
}
