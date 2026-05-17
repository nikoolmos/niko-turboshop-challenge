import { useState } from 'react';
import EmptyState from '../../emptyState/emptyState';
import { Part } from '../../interfaces/part';
import { Filter } from '../Filters/Filters';
import { PartList } from '../PartList/PartList';
import { SearchInput } from '../SearchInput/SearchInput';
import useCatalogFilter from '../../hooks/useCatalogFilter/useCatalogFilter';
import { PageSizeSelect } from '../PageSizeSelect/PageSizeSelect';

interface CatalogUIProps {
    catalog: Part[] | undefined;
}

const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    //    alignItems: 'center'
}

export default function CatalogUI(props: CatalogUIProps) {

    const [searchTerm, setSearchTerm] = useState<string | undefined>();
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const toggleBrandSelection = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(theBrand => theBrand !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    }

    const toggleModelsSelection = (model: string) => {
        if (selectedModels.includes(model)) {
            setSelectedModels(selectedModels.filter(theModel => theModel !== model));
        } else {
            setSelectedModels([...selectedModels, model]);
        }
    }

    const { filterOptions, filteredParts } = useCatalogFilter({
        searchTerm,
        brand: selectedBrands,
        model: selectedModels,
        yearFrom: '',
        yearUpTo: '',
        catalog: props.catalog
    });

    if (!props.catalog) {
        return <EmptyState />;
    }

    return (
        <div style={styles}>
            <div>
                {filterOptions && <Filter options={filterOptions} onFilterByBrand={(brand: string) => toggleBrandSelection(brand)} onFilterByModel={(model: string) => toggleModelsSelection(model)} />}
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <SearchInput value={searchTerm} onSearch={(e: any) => setSearchTerm(e.target.value)} />
                    <PageSizeSelect onChange={(val) => { setItemsPerPage(val) }} size={itemsPerPage} options={[10, 20, 50, 100]} label="Partes Por Página" />
                </div>
                {filteredParts ? <PartList catalog={filteredParts} /> : <EmptyState />}
            </div>
        </div>
    );

}