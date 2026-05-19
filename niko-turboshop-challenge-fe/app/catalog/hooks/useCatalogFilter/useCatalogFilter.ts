"use client";

import { useMemo, useState } from "react";
import { Part } from "../../interfaces/part";
import { FilterStrategy } from "./filterStrategies/filterStrategy";
import { FilterBySearchTermStrategy } from "./filterStrategies/filterBySearchTermStrategy";
import { FilterByBrandStrategy } from "./filterStrategies/filterByBrandStrategy";
import { FilterByModelStrategy } from "./filterStrategies/filterByModelStrategy";
import { FilterByYearFrom } from "./filterStrategies/filterByYearFromStrategy";
import { FilterByYearUpTo } from "./filterStrategies/filterByYearUpToStrategy";

interface UseCatalogFilterConfig {
    yearFrom: string;
    yearUpTo: string;
    catalog: Part[] | undefined;
}

export default function useCatalogFilter(config: UseCatalogFilterConfig) {
    const [searchTerm, setSearchTerm] = useState<string | undefined>();
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);


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
        const isSearchByTermFilterActive = searchTerm && searchTerm !== '';
        const isBrandFilterActive = selectedBrands.length > 0;
        const isModelFilterActive = selectedModels.length > 0;
        const isYearFromFilterActive = config.yearFrom !== '';
        const isYearUpToFilterActive = config.yearUpTo !== '';
        const filters = new Set<FilterStrategy>();

        if (isSearchByTermFilterActive) {
            filters.add(new FilterBySearchTermStrategy(searchTerm!));
        }

        if (isBrandFilterActive) {
            filters.add(new FilterByBrandStrategy(selectedBrands));
        }

        if (isModelFilterActive) {
            filters.add(new FilterByModelStrategy(selectedModels));
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
    }, [selectedBrands, selectedModels, config.catalog, searchTerm, config.yearUpTo, config.yearFrom]);


    const handleSearchTermChange = (newSearchTerm: string) => setSearchTerm(newSearchTerm);
    const handleModelsChange = (newModels: string[]) => setSelectedModels(newModels);
    const handleBrandsChange = (newBrands: string[]) => setSelectedBrands(newBrands);

    return {
        filteredParts,
        filterOptions,
        selectedModels,
        selectedBrands,
        searchTerm,
        handleSearchTermChange,
        handleModelsChange,
        handleBrandsChange
    };
}