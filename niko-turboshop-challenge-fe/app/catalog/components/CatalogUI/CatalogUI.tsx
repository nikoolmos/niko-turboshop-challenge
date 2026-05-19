import EmptyState from '../emptyState/emptyState';
import { Part } from '../../interfaces/part';
import { Filter } from '../Filters/Filters';
import { PartList } from '../PartList/PartList';
import { SearchInput } from '../SearchInput/SearchInput';
import useCatalogFilter from '../../hooks/useCatalogFilter/useCatalogFilter';
import { PageSizeSelect } from '../PageSizeSelect/PageSizeSelect';
import { Paginator } from '../Paginator/paginator';
import { Loader } from '../../../common/components/Loader/Loader';

interface CatalogUIProps {
    catalog: Part[] | undefined;
    itemsPerPage: number;
    totalPages: number;
    loading: boolean;
    onItemsPerPageChange: (value: number) => void;
    onPageChange: (page: number) => void;
}

const styles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
}

function LoaderWrapper() {
    return (
        <div style={{
            marginTop: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Loader />
        </div>
    );
}

export default function CatalogUI(props: CatalogUIProps) {

    const { filterOptions,
        filteredParts,
        selectedModels,
        selectedBrands,
        searchTerm,
        yearFrom,
        yearUpTo,
        handleBrandsChange,
        handleModelsChange,
        handleSearchTermChange,
        handleYearFromChange,
        handleYearUpToChange
    } = useCatalogFilter({
        catalog: props.catalog
    });

    const toggleBrandSelection = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            handleBrandsChange(selectedBrands.filter(theBrand => theBrand !== brand));
        } else {
            handleBrandsChange([...selectedBrands, brand]);
        }
    }

    const toggleModelsSelection = (model: string) => {
        if (selectedModels.includes(model)) {
            handleModelsChange(selectedModels.filter(theModel => theModel !== model));
        } else {
            handleModelsChange([...selectedModels, model]);
        }
    }

    const hidePaginator = searchTerm || selectedBrands.length > 0 || selectedModels.length > 0 || yearFrom || yearUpTo;

    function Content() {
        return (
            <>
                <div>
                    {
                        filterOptions && (
                            <Filter
                                options={filterOptions}
                                onFilterByBrand={(brand: string) => toggleBrandSelection(brand)}
                                onFilterByModel={(model: string) => toggleModelsSelection(model)}
                                onFilterByYearFrom={handleYearFromChange}
                                onFilterByYearUpTo={handleYearUpToChange}
                            />
                        )}
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <SearchInput value={searchTerm} onSearch={(e: any) => handleSearchTermChange(e.target.value)} />
                        <PageSizeSelect
                            onChange={(val) => { props.onItemsPerPageChange(val) }}
                            size={props.itemsPerPage}
                            options={[10, 20, 50, 100]}
                            label="Partes Por Página"
                        />
                    </div>
                    {filteredParts ? <PartList catalog={filteredParts} /> : <EmptyState />}
                    {!hidePaginator ? <Paginator totalPages={props.totalPages} onPageClick={props.onPageChange} /> : null}
                </div>
            </>
        )
    }

    if (props.loading) {
        return <LoaderWrapper />
    }

    return (
        <div style={styles}>
            {props.catalog ? Content() : <EmptyState />}
        </div>
    );

}