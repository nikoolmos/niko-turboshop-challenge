"use client";

import CatalogUI from "./components/CatalogUI/CatalogUI";
import useCatalog from "./hooks/useCatalog/useCatalog";

export default function Catalog() {
    const { catalog } = useCatalog();

    return (
        <div>
            <h1>HOLA MUNDO</h1>
            <CatalogUI catalog={catalog} />
        </div>
    )
}