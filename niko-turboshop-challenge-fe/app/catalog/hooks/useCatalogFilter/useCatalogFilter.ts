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
    catalog: Part[] | undefined;
}

export default function useCatalogFilter(config: UseCatalogFilterConfig) {
    const [searchTerm, setSearchTerm] = useState<string | undefined>();
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [yearFrom, setYearFrom] = useState<string>('');
    const [yearUpTo, setYearUpTo] = useState<string>('');


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
            brands: Array.from(brands),
            yearFrom,
            yearUpTo,
        };

    }, [config.catalog]);


    const filteredParts = useMemo(() => {
        const isSearchByTermFilterActive = searchTerm && searchTerm !== '';
        const isBrandFilterActive = selectedBrands.length > 0;
        const isModelFilterActive = selectedModels.length > 0;
        const isYearFromFilterActive = yearFrom !== '';
        const isYearUpToFilterActive = yearUpTo !== '';
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
            filters.add(new FilterByYearFrom(yearFrom));
        }

        if (isYearUpToFilterActive) {
            filters.add(new FilterByYearUpTo(yearUpTo));
        }

        return config?.catalog?.filter((part: Part) => {
            return filters.values().every(filter => filter.execute(part));
        });
    }, [selectedBrands, selectedModels, config.catalog, searchTerm, yearUpTo, yearFrom]);


    const handleSearchTermChange = (newSearchTerm: string) => setSearchTerm(newSearchTerm);
    const handleModelsChange = (newModels: string[]) => setSelectedModels(newModels);
    const handleBrandsChange = (newBrands: string[]) => setSelectedBrands(newBrands);
    const handleYearFromChange = (newYearFrom: string) => setYearFrom(newYearFrom);
    const handleYearUpToChange = (newYearUpTo: string) => setYearUpTo(newYearUpTo);

    return {
        filteredParts,
        filterOptions,
        selectedModels,
        selectedBrands,
        searchTerm,
        yearFrom,
        yearUpTo,
        handleSearchTermChange,
        handleModelsChange,
        handleBrandsChange,
        handleYearFromChange,
        handleYearUpToChange,
    };
}