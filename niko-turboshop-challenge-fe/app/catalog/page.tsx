"use client";

import CatalogUI from "./components/CatalogUI/CatalogUI";
import Navbar from "./components/Navbar/Narbar";
import useCatalog from "./hooks/useCatalog/useCatalog";

export default function Catalog() {
    const { catalog } = useCatalog();

    return (
        <div>
            <Navbar />
            <CatalogUI catalog={catalog} />
        </div>
    )
}