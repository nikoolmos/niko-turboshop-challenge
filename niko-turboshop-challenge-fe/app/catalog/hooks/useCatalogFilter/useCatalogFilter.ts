import { Part } from "../useCatalog/useCatalog";

interface UseCatalogFilterConfig {
    brand: string;
    model: string;
    year: string;
    searchTerm: string | undefined;
    catalog: Part[] | undefined;
}

export default function useCatalogFilter(config: UseCatalogFilterConfig) {
    if(!config.catalog) {
        return undefined;
    }
    
    const filteredParts = config.catalog.filter((item: Part) => {
        let result = false;

        if (config.searchTerm && config.searchTerm !== '')  {
            result = item.title.toLowerCase().includes(config.searchTerm.toLowerCase())
        } else {
            result = true;
        }

        // if (config.model !== '') {
        //     result = result && item.title.toLowerCase().includes(config.model.toLowerCase())
        // }

        // if (config.year !== '') {
        //     result = result && item.title.toLowerCase().includes(config.year.toLowerCase())
        // }

        // if (config.brand !== '') {
        //     result = result && item.title.toLowerCase().includes(config.brand.toLowerCase())
        // }

        return result;

    });

    return filteredParts;
}