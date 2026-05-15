"use client";

import { useEffect, useMemo } from "react";
import { getCatalog } from "../../db/db";
import { Part } from "../../interfaces/part";

interface UseCatalogFilterConfig {
    brand: string[];
    model: string[];
    year: string;
    searchTerm: string | undefined;
    catalog: Part[] | undefined;
}

export default function useCatalogFilter(config: UseCatalogFilterConfig) {
    const filterOptions = useMemo(() => {
        if (!config.catalog) {
            return undefined;
        }

        const models = new Set<string>();
        const brands = new Set<string>();

        config.catalog.forEach((part: Part) => {
            part.model?.forEach(model => models.add(model));
            brands.add(part.brand);
        });

        return {
            models: Array.from(models),
            brands: Array.from(brands)
        };

    }, [config.catalog]);


    const filteredParts = useMemo(() => {
        const isSearchByTermFilterActive = config.searchTerm && config.searchTerm !== '';
        const isBrandFilterActive = config.brand.length >0;
        return config?.catalog?.filter((item: Part) => {
            let result = false;


            if(isSearchByTermFilterActive && isBrandFilterActive && config.searchTerm) {
                return item.title.toLowerCase().includes(config.searchTerm.toLowerCase())
            }

            if (config.searchTerm && config.searchTerm !== '') {
            } else {
                result = true;
            }

            // if (config.model !== '') {
            //     result = result && item.title.toLowerCase().includes(config.model.toLowerCase())
            // }

            // if (config.year !== '') {
            //     result = result && item.title.toLowerCase().includes(config.year.toLowerCase())
            // }

            if (config.brand.length > 0) {
                result = result && config.brand.includes(item.title.toLocaleLowerCase())
            } else {
                result = true;
            }

            return result;

        });
    }, [config]);

    return {
        filteredParts,
        filterOptions,
    };
}