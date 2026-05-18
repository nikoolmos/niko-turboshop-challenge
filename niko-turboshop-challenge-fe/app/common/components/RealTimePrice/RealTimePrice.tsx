import { currencyFormatter } from "../../utils/currencyFormatter";
import { UseRealTimePrice } from "./hooks/UseRealTimePrice";

export interface RealTimePriceProps {
    defaultValue: number;
    sku: string;
    provider: string;
}

export function RealTimePrice(props: RealTimePriceProps) {
    const { price, error } = UseRealTimePrice(props.sku, props.provider);

    if(!price) {
        return  <span>{currencyFormatter(props.defaultValue)}</span>
    }

    return (
        <span>{currencyFormatter(price)}</span>
    )
}