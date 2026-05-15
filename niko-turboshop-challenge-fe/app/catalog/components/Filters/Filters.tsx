import React, { useState } from 'react';


export interface FilterProps {
    options: {
        models: string[],
        brands: string[],
    };
}
const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: 'lightgrey, solid 1px',
    padding: '20px',
    marginRight: '30px',
    minWidth: '300px',
    minHeight: '600px',
    backgroundColor: 'white',
    borderRadius: '7px'
}


const titleStyles: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
}


const titleWrapperStyles: React.CSSProperties = {
    alignSelf: 'start'
}

const filterTypeTitle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: '0.5rem'
}

export function Filter(props: FilterProps) {
    const [showBrandsFilters, setShowBrandsFilters] = useState<boolean>(true);
    const [showModelsFilters, setShowModelsFilters] = useState<boolean>(true);

    const { brands, models } = props.options;

    return (
        <section style={styles}>
            <div style={titleWrapperStyles}>
                <h3 style={titleStyles}>Filtros</h3>
            </div>
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <button style={{cursor: 'pointer' }} onClick={() => setShowBrandsFilters(!showBrandsFilters)}>
                        {showBrandsFilters ? <i>▲</i> : <i>▼</i>}
                        <span style={filterTypeTitle}>Marca</span>
                    </button>
                    {showBrandsFilters && <ul>
                        {brands.length > 0 ? (
                            brands.map((item) => (
                                <li key={item} >
                                    <input style={{marginRight: '10px'}} type="checkbox" name="" id={item} />
                                    <label htmlFor={item}>{item}</label>
                                </li>
                            ))
                        ) : (
                            <li>Sin filtros disponibles.</li>
                        )}
                    </ul>}
                </div>

                <div>
                    <button style={{cursor: 'pointer' }} onClick={() => setShowModelsFilters(!showModelsFilters)}>
                        {showModelsFilters ? <i>▲</i> : <i>▼</i>}
                        <span style={filterTypeTitle}>Modelos</span>
                    </button>
                    {showModelsFilters && <ul>
                        {models.length > 0 ? (
                            models.map((item) => (
                                <li key={item} >
                                    <input style={{marginRight: '10px'}} type="checkbox" name="" id={item} />
                                    <label htmlFor={item}>{item}</label>
                                </li>
                            ))
                        ) : (
                            <li>Sin filtros disponibles.</li>
                        )}
                    </ul>}
                </div>

            </div>

        </section>
    );
}