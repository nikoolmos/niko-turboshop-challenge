import { currencyFormatter } from "../../utils/currencyFormatter";
import { UseRealTimeQuantity } from "./hooks/UseRealTimeQuantity";

export interface RealTimeQuantityProps {
    defaultValue: number;
    sku: string;
    provider: string;
}

export function RealTimeQuantity(props: RealTimeQuantityProps) {
    const { quantity, error } = UseRealTimeQuantity(props.sku, props.provider);

    if(!quantity) {
        return  <span>{props.defaultValue}</span>
    }

    return (
        <span>{quantity}</span>
    )
}