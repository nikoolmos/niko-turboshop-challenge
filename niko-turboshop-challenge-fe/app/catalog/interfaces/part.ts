export interface Part {
    id: string;
    title: string;
    description: string;
    sku: string;
    qty: number;
    price: number;
    picture: string[];
    providers: string[];
    model: string[] | undefined;
    year: Array<{
        from: string,
        upTo: string;
    }>;
    brand: string;
}