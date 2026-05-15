import React from "react";
import { Part } from "../../workers/reconciler";

interface PartListItemProps {
    part: Part
}
const styles: React.CSSProperties = {
    padding: '40px',
    border: 'solid 1px lightgrey',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'stretch'
}

const leftSectionStyles: React.CSSProperties = {

}

const rightSectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
    marginLeft: '40px',
    alignSelf: 'end'
}

const infoContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'stretch'
}


const infoContainerWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch'
}

const imageStyles: React.CSSProperties = {
    width: '200px',
    height: '200px',
    backgroundColor: 'grey'
}

export function PartListItem(props: PartListItemProps) {
    return (
        <div style={styles}>
            <img style={styles} src="" alt="" />
            <div style={infoContainerWrapperStyle}>

                <div style={infoContainerStyle}>
                    <div>
                        <p>{props.part.title}</p>
                        <p>{props.part.description}</p>
                    </div>
                    <div style={rightSectionStyles}>
                        <p>${props.part.price}</p>
                        <p>{props.part.qty} units</p>
                    </div>
                </div>
                <div>
                    <p>SKU: {props.part.sku}</p>
                    {
                        props.part.providers.length > 0 &&
                        props.part.providers.map(provider => <p>{provider}</p>)
                    }
                </div>
            </div>
        </div>
    );
}