import { useEffect, useState } from "react";
import { PriceService } from "../services/PriceService";

export function UseRealTimePrice(id: string, provider: string) {
    const [price, setPrice] = useState<number>();
    const [error, setError] = useState<boolean>();

    useEffect(() => {
        const clearId = setInterval(() => {
            // PriceService.getPrice(id, provider).then(priceObject => {
            //     setPrice(priceObject.price);
            // })
            // .catch(error => {
            //     setError(error);
            //     console.error(error);
            // })
        }, 3000);

        return () => {
            clearInterval(clearId);
        };
    }, [id]);

    return {
        price, 
        error
    };
}