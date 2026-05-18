import { useEffect, useState } from "react";
import { QuantityService } from "../services/QuantityService";

export function UseRealTimeQuantity(id: string, provider: string) {
    const [quantity, setQuantity] = useState<number>();
    const [error, setError] = useState<boolean>();

    useEffect(() => {
        const clearId = setInterval(() => {
            QuantityService.getQuantity(id, provider).then(quantityObject => {
                setQuantity(quantityObject.quantity);
            })
            .catch(error => {
                setError(error);
                console.error(error);
            })
        }, 3000);

        return () => {
            clearInterval(clearId);
        };
    }, [id]);

    return {
        quantity, 
        error
    };
}