import { RepuestosMaxItemDetailResponse } from "src/item-detail/interfaces/RepuestosMaxItemDetailResponse";
import { BaseService } from "../base-service/base-service";

export class RepuestosMaxService extends BaseService {

    constructor() {
        super();

        this.endpoint = '/api/repuestosmax/productos';
    }

    public getPartDetail(id: string): RepuestosMaxItemDetailResponse {
            this.queryParams = {
                codigo: id
            };
    
            return super.request() as RepuestosMaxItemDetailResponse;
        }
}
