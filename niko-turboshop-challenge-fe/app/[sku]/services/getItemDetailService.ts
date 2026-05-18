import { GetItemDetailServiceResponse } from "../interfaces/getItemDetailServiceResponse";
import { PartDetail } from "../interfaces/PartDetail";

export class GetItemDetailService {
    public static async getDetails(id: string, provider: string): Promise<PartDetail> {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item-detail`);
        url.searchParams.set('id', id)
        url.searchParams.set('provider', provider);
        console.log('REQ', url.toString())
        const response = await fetch(url);
        const data = await response.json();

        return data;
        
        
        
        //as GetItemDetailServiceResponse;
    }
}