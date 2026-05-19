'use client';

import Navbar from "../common/components/Navbar/Narbar";
import { ErrorState } from "./components/ErrorState/ErrorState";
import { Loader } from "../common/components/Loader/Loader";
import { PartDetailUI } from "./components/PartDetailUI/PartDetailUI";
import { useGetPartDetail } from "./hooks/useGetPartDetail";
import { useParams, useSearchParams } from "next/navigation";

export default function ItemPage() {
    const searchParams = useSearchParams();
    const params = useParams<{ sku: string; }>();
    const id = params.sku;
    const provider = searchParams.get('provider')!;


    const { error, partData, isLoading, retry } = useGetPartDetail({ id, provider });

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Navbar />
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {partData && <PartDetailUI part={partData} />}
                {isLoading && <Loader />}
                {error && <ErrorState message="Ocurrió un error al cargar los detalles de la parte" title="Ha ocurrido un error" onRetry={() => retry()} />}
            </div>

        </div>
    )
};