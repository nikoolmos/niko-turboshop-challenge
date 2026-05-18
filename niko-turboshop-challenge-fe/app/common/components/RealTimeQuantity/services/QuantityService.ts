import { QuantityObject } from "../interfaces/QuantityObject";

export class QuantityService {
    public static async getQuantity(id: string, provider: string): Promise<QuantityObject> {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quantity`);
        url.searchParams.set('sku', id);
        url.searchParams.set('provider', provider);

        const response = await fetch(url);
        const quantityObject = await response.json();
        return quantityObject;
    }
}