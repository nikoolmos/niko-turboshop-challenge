export class PriceService {
    public static async getPrice(id: string, provider: string): Promise<priceObject> {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/price`);
        url.searchParams.set('sku', id);
        url.searchParams.set('provider', provider);

        const response = await fetch(url);
        const priceObject = await response.json();
        return priceObject;
    }
}