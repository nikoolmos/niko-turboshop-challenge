import React, { useState } from 'react';


export interface FilterProps {
    options: {
        models: string[];
        brands: string[];
        yearFrom: string;
        yearUpTo: string;
    };
    onFilterByBrand: (brand: string) => void;
    onFilterByModel: (model: string) => void;
    onFilterByYearFrom: (yearFrom: string) => void;
    onFilterByYearUpTo: (yearUpTo: string) => void;
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
                    <button style={{ cursor: 'pointer' }} onClick={() => setShowBrandsFilters(!showBrandsFilters)}>
                        <i style={{ fontSize: '1.5rem' }}>{showBrandsFilters ? '▲' : '▼'}</i>
                        <span style={filterTypeTitle}>Marca</span>
                    </button>
                    {showBrandsFilters && <ul>
                        {brands.length > 0 ? (
                            brands.map((item) => (
                                <li key={item} >
                                    <input style={{ marginRight: '10px' }} type="checkbox" name="" id={item} onChange={() => props.onFilterByBrand(item)} />
                                    <label htmlFor={item}>{item}</label>
                                </li>
                            ))
                        ) : (
                            <li>Sin filtros disponibles.</li>
                        )}
                    </ul>}
                </div>

                <div>
                    <button style={{ cursor: 'pointer' }} onClick={() => setShowModelsFilters(!showModelsFilters)}>
                        <i style={{ fontSize: '1.5rem' }}>{showModelsFilters ? '▲' : '▼'}</i>
                        <span style={filterTypeTitle}>Modelos</span>
                    </button>
                    {showModelsFilters && <ul>
                        {models.length > 0 ? (
                            models.map((item) => (
                                <li key={item} >
                                    <input style={{ marginRight: '10px' }} type="checkbox" name="" id={item} onChange={() => props.onFilterByModel(item)} />
                                    <label htmlFor={item}>{item}</label>
                                </li>
                            ))
                        ) : (
                            <li>Sin filtros disponibles.</li>
                        )}
                    </ul>}
                </div>

                <div>
                    <button style={{ cursor: 'pointer' }} onClick={() => setShowModelsFilters(!showModelsFilters)}>
                        <i style={{ fontSize: '1.5rem' }}>{showModelsFilters ? '▲' : '▼'}</i>
                        <span style={filterTypeTitle}>Años</span>
                    </button>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label style={{fontWeight: 'bold', margin: '10px'}} htmlFor="filtro-from">Desde:</label>
                            <input style={{backgroundColor: '#EEE', padding: "5px", borderRadius: '5px'}} type="text" id="filtro-from" onChange={(e) => props.onFilterByYearFrom(e.target.value)} />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label style={{fontWeight: 'bold', margin: '10px'}} htmlFor="filtro-upto">Hasta:</label>
                            <input style={{backgroundColor: '#EEE', padding: "5px", borderRadius: '5px'}} type="text" id="filtro-upto" onChange={(e) => props.onFilterByYearUpTo(e.target.value)} />
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}