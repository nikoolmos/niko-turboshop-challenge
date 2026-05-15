"use client";

import { useEffect, useMemo } from "react";
import { getCatalog } from "../../db/db";
import { Part } from "../useCatalog/useCatalog";

interface UseCatalogFilterConfig {
    brand: string;
    model: string;
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
        return config?.catalog?.filter((item: Part) => {
            let result = false;

            if (config.searchTerm && config.searchTerm !== '') {
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
    }, [config]);

    return {
        filteredParts,
        filterOptions,
    };
}