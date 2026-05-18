"use client";

import { useEffect, useRef, useState } from "react";
import { getCatalog } from "../../db/db";
import { Part } from "../../interfaces/part";

export default function useCatalog() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [catalog, setCatalog] = useState<Part[]>();

    const workerRef = useRef<Worker | null>(null);
    const requesterRef = useRef<Worker | null>(null);
    const reconcilerRef = useRef<Worker | null>(null);


    useEffect(() => {
        requesterRef.current?.postMessage({
            type: 'NEW_PARAMS',
            payload: {
                page,
                limit: itemsPerPage,
            },
        });
    }, [itemsPerPage, page]);

    useEffect(() => {
        workerRef.current = new Worker(
            new URL("../../workers/scheduler.ts", import.meta.url)
        );

        workerRef.current.onmessage = (event: MessageEvent<number>) => {
            requesterRef.current?.postMessage({
                type: 'TRIGGER_CATALOG_REQUEST'
            })
        };

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

        requesterRef.current.onmessage = (event: MessageEvent<any>) => {
            setCatalog(event.data.payload);

            // reconcilerRef.current?.postMessage({
            //     type: 'RECONCILE_PART_DATA',
            //     payload: event.data.payload
            // });
        };

        reconcilerRef.current = new Worker(
            new URL("../../workers/reconciler.ts", import.meta.url)
        );

        reconcilerRef.current.onmessage = (event: MessageEvent<any>) => {
            getCatalog().then((parts: Part[]) => {
                setCatalog(parts);
            });
        };

        workerRef.current.postMessage({ type: '' });

        return () => {
            workerRef.current?.terminate();
            requesterRef.current?.terminate();
            reconcilerRef.current?.terminate();
        };

    }, []);


    const handleSetPage = (page: number) => setPage(page);
    const handleSetItemsPerPage = (itemsPerPage: number) => setItemsPerPage(itemsPerPage);

    return {
        catalog,
        itemsPerPage,
        handleSetItemsPerPage,
        handleSetPage,
    };
}