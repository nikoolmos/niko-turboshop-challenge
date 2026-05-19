"use client";

import { useEffect, useRef, useState } from "react";
import { Part } from "../../interfaces/part";

export default function useCatalog() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [catalog, setCatalog] = useState<Part[]>();
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const requesterRef = useRef<Worker | null>(null);


    useEffect(() => {
        setLoading(true);
        requesterRef.current?.postMessage({
            type: 'NEW_PARAMS',
            payload: {
                page,
                limit: itemsPerPage,
            },
        });

        requesterRef.current?.postMessage({
            type: 'TRIGGER_CATALOG_REQUEST'
        });
    }, [itemsPerPage, page]);

    useEffect(() => {
        setLoading(true);
        requesterRef.current = new Worker(
            new URL("../../workers/requester.ts", import.meta.url)
        );

        requesterRef.current?.postMessage({
            type: 'INIT',
            payload: {
                baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL
            },
        });

        requesterRef.current?.postMessage({
            type: 'NEW_PARAMS',
            payload: {
                page,
                limit: itemsPerPage,
            },
        });

        requesterRef.current?.postMessage({
            type: 'TRIGGER_CATALOG_REQUEST'
        })

        requesterRef.current.onmessage = (event: MessageEvent<any>) => {
            setCatalog(event.data.payload.parts);
            setTotalPages(event.data.payload.totalPages);
            setLoading(false);
        };

        return () => {
            requesterRef.current?.terminate();
        };

    }, []);


    const handleSetPage = (page: number) => setPage(page);
    const handleSetItemsPerPage = (itemsPerPage: number) => setItemsPerPage(itemsPerPage);

    return {
        catalog,
        itemsPerPage,
        totalPages,
        page,
        loading,
        handleSetItemsPerPage,
        handleSetPage,
    };
}