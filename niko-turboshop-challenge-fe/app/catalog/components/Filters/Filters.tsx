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
    justifyContent: 'center',
    alignItems: 'center',
    border: 'lightgrey, solid 1px',
    padding: '20px',
    marginRight: '30px',
    minWidth: '400px',
    minHeight: '600px'
}

export function Filter(props: FilterProps) {
    const [showBrandsFilters, setShowBrandsFilters] = useState<boolean>(true);
    const [showModelsFilters, setShowModelsFilters] = useState<boolean>(true);

    const { brands, models } = props.options;

    return (
        <section style={styles}>
            <div>
                <button onClick={() => setShowBrandsFilters(!showBrandsFilters)}>
                    <p>Marca</p>
                </button>
                {showBrandsFilters && <ul>
                    {brands.length > 0 ? (
                        brands.map((item, index) => (
                            <li key={index} >
                                <input type="checkbox" name="" id="" />  {item}
                            </li>
                        ))
                    ) : (
                        <li>Sin filtros disponibles.</li>
                    )}
                </ul>}
            </div>

            <div>
                <button onClick={() => setShowModelsFilters(!showModelsFilters)}>
                    <p>Modelos</p>
                </button>
                {showModelsFilters &&  <ul>
                    {models.length > 0 ? (
                        models.map((item, index) => (
                            <li key={index} >
                                <input type="checkbox" name="" id="" />  {item}
                            </li>
                        ))
                    ) : (
                        <li>Sin filtros disponibles.</li>
                    )}
                </ul>}
            </div>

        </section>
    );
}