import React from "react";
import { Part } from "../../interfaces/part";
import { currencyFormatter } from "@/app/common/utils/currencyFormatter";

interface PartListItemProps {
    part: Part
}
const styles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(1, 1fr)',
    gap: '2rem',
    padding: '40px',
    marginBottom: '3rem',
    backgroundColor: 'white',
    borderRadius: '7px',
    boxShadow: '0 2px 20px 5px lightgrey',

}

const rightSectionStyles: React.CSSProperties = {
    gridColumnStart: '5',
    gridRowStart: '1',
}

const infoContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
}

const infoContainerWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gridColumn: 'span 3 / span 3',
    gridColumnStart: '2',
    gridRowStart: '1'
}

const imageStyles: React.CSSProperties = {
    width: '200px',
    height: '200px',
    backgroundColor: 'grey'
}

const missingImageStyles: React.CSSProperties = {
    width: '200px',
    height: '200px',
    border: '3px dashed lightgrey',
    borderRadius: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}

export function PartListItem(props: PartListItemProps) {
    return (
        <div style={styles}>
            <div style={missingImageStyles}>
                <p style={{ fontSize: '4rem' }}>📸</p>
                <p>Imagen no disponible</p>
            </div>
            {/* <img style={styles} src="" alt="" /> */}

            <div style={infoContainerWrapperStyle}>
                <div style={infoContainerStyle}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.part.title}</p>
                    <p>{props.part.description}</p>
                </div>
                <div style={{ color: 'gray', fontStyle: 'italic' }}>
                    <p>SKU: {props.part.sku}</p>
                    {
                        props.part.providers.length > 0 &&
                        props.part.providers.map(provider => <p>{provider}</p>)
                    }
                </div>
            </div>
            <div style={rightSectionStyles}>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }} >{currencyFormatter(props.part.price)}</p>
                <p style={{ fontStyle: 'italic' }}>{props.part.qty} unidades</p>
            </div>
        </div>
    );
}