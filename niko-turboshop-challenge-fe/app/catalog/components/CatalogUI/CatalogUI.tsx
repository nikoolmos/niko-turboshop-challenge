import { useState } from 'react';
import EmptyState from '../../emptyState/emptyState';
import { Part } from '../../hooks/useCatalog/useCatalog';
import { Filter } from '../Filters/Filters';
import { PartList } from '../PartList/PartList';
import { SearchInput } from '../SearchInput/SearchInput';
import useCatalogFilter from '../../hooks/useCatalogFilter/useCatalogFilter';

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
    const {filterOptions, filteredParts} = useCatalogFilter({
        searchTerm,
        brand: '',
        model: '',
        year: '',
        catalog: props.catalog
    });
    console.log('XXXX', props);

    if (!props.catalog) {
        return <EmptyState />;
    }

    return (
        <div style={styles}>
            <div>
                {filterOptions && <Filter options={filterOptions}/>}
            </div>
            <div>
                <SearchInput value={searchTerm} onSearch={(e: any) => setSearchTerm(e.target.value)}/>
                {filteredParts ? <PartList catalog={filteredParts} /> : <EmptyState /> }
            </div>
        </div>
    );

}