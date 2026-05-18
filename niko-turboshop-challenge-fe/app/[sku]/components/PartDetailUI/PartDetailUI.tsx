'use client';

import { useRouter } from "next/navigation";
import { PartDetail } from "../../interfaces/PartDetail";

export interface PartDetailUIProps {
    part: PartDetail;
}

const parentStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(7, 1fr)',
    gap: '8px',
}

const styles: React.CSSProperties = {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '7px',
    boxShadow: '0 2px 20px 5px lightgrey',

}

const backStyles: React.CSSProperties = {
    fontStyle: 'italic',
    fontWeight: 'bold',
    backgroundColor: '#DDD',
    display: 'inline-block',
    padding: '10px',
    borderRadius: '7px',
    cursor: 'pointer',
};



export function PartDetailUI(props: PartDetailUIProps) {
    const { part } = props;

    const { push } = useRouter();

    return (
        <div style={{ margin: '3px' }}>
            <div style={{ padding: '20px 0' }}>

                <a style={backStyles} onClick={() => push('/catalog')}>
                    <i>◄</i>
                    <span>
                        Ir al Catálogo
                    </span>
                </a>
                <h1 style={{ color: 'black', fontSize: '4rem', fontWeight: "bold" }}>{part.title}</h1>
                <p style={{ color: 'grey',  fontStyle: 'italic'}}>SKU: {part.sku}</p>
            </div>
            <div style={styles}>
                <ul style={parentStyles}>
                    <li>
                        <b>SKU</b>
                        <p>{part.sku}</p>
                    </li>
                    <li>
                        <b>CÓDIGO OEM</b>
                        <p>{part.oemCode}</p>
                    </li>
                    <li>
                        <b>NOMBRE</b>
                        <p>{part.title}</p>
                    </li>
                    <li>
                        <b>DESCRIPCIÓN</b>
                        <p>{part.desc}</p>
                    </li>
                    <li>
                        <b>MARCA</b>
                        <p>{part.brandName}</p>
                    </li>
                    <li>
                        <b>CATEGORÍA</b>
                        <p>{part.categoryName}</p>
                    </li>
                    <li>
                        <b>PRECIO UNITARIO</b>
                        <p>{part.unitPrice}</p>
                    </li>
                    <li>
                        <b>MONEDA</b>
                        <p>{part.currencyCode}</p>
                    </li>
                    <li>
                        <b>CANTIDAD DISPONIBLE</b>
                        <p>{part.qtyAvailable}</p>
                    </li>
                    <li>
                        <b>DEPÓSITO</b>
                        <p>{part.warehouseLocation}</p>
                    </li>
                    <li>
                        <b>PESO (MONTO)</b>
                        <p>{part.weightValue}</p>
                    </li>
                    <li>
                        <b>PESO (UNIDAD)</b>
                        <p>{part.weightUnit}</p>
                    </li>
                    <li>
                        <b>IMG URLS:</b>
                        <p>{part.imgUrls}</p>
                    </li>
                    <li>
                        <b>VEHÍCULOS COMPATIBLES</b>
                        <p>{part.fitsVehicles}</p>
                    </li>

                </ul>
            </div>
        </div>
    );
}