"use client";

import CatalogUI from "./components/CatalogUI/CatalogUI";
import Navbar from "../common/components/Navbar/Narbar";
import useCatalog from "./hooks/useCatalog/useCatalog";

export default function Catalog() {

    const { catalog,
        itemsPerPage,
        handleSetItemsPerPage,
        handleSetPage,
        totalPages,
        loading
    } = useCatalog();

    return (
        <div>
            <Navbar />
            <CatalogUI
                catalog={catalog}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleSetItemsPerPage}
                totalPages={totalPages}
                onPageChange={handleSetPage}
                loading={loading}
            />
        </div>
    )
}