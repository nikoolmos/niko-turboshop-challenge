"use client";

import { useMemo } from "react";
import { Part } from "../../interfaces/part";
import { FilterStrategy } from "./filterStrategies/filterStrategy";
import { FilterBySearchTermStrategy } from "./filterStrategies/filterBySearchTermStrategy";
import { FilterByBrandStrategy } from "./filterStrategies/filterByBrandStrategy";
import { FilterByModelStrategy } from "./filterStrategies/filterByModelStrategy";
import { FilterByYearFrom } from "./filterStrategies/filterByYearFromStrategy";
import { FilterByYearUpTo } from "./filterStrategies/filterByYearUpToStrategy";

interface UseCatalogFilterConfig {
    brand: string[];
    model: string[];
    yearFrom: string;
    yearUpTo: string;
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
        const isBrandFilterActive = config.brand.length > 0;
        const isModelFilterActive = config.model.length > 0;
        const isYearFromFilterActive = config.yearFrom !== '';
        const isYearUpToFilterActive = config.yearUpTo !== '';
        const filters = new Set<FilterStrategy>();

        if (isSearchByTermFilterActive) {
            filters.add(new FilterBySearchTermStrategy(config.searchTerm!));
        }

        if (isBrandFilterActive) {
            filters.add(new FilterByBrandStrategy(config.brand));
        }

        if (isModelFilterActive) {
            filters.add(new FilterByModelStrategy(config.model));
        }

        if (isYearFromFilterActive) {
            filters.add(new FilterByYearFrom(config.yearFrom));
        }

        if (isYearUpToFilterActive) {
            filters.add(new FilterByYearUpTo(config.yearUpTo));
        }

        return config?.catalog?.filter((part: Part) => {
            return filters.values().every(filter => filter.execute(part));
        });
    }, [config.brand, config.model, config.catalog, config.searchTerm, config.yearUpTo, config.yearFrom]);

    return {
        filteredParts,
        filterOptions,
    };
}