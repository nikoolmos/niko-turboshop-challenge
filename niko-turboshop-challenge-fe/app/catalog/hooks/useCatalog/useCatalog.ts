"use client";

import { useEffect, useRef, useState } from "react";

const DB_NAME = 'niko-turboshop-challenge-db';
const DB_VERSION = 1;

export interface Part {
    id: string;
    title: string;
    description: string;
    sku: string;
    qty: number;
    price: number;
    picture: string[];
    providers: string[];
}

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // This handles schema changes (runs first time or version change)
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('parts')) {
                db.createObjectStore('parts', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};


const getCatalog = async () => {
    const db = await openDB();
    const transaction = db.transaction('parts', 'readonly');
    const store = transaction.objectStore('parts');

    const request = store.getAll();

    return new Promise<Part[]>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export default function useCatalog() {
    const workerRef = useRef<Worker | null>(null);
    const requesterRef = useRef<Worker | null>(null);
    const reconcilerRef = useRef<Worker | null>(null);

    const [catalog, setCatalog] = useState<Part[]>();

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

        requesterRef.current.onmessage = (event: MessageEvent<any>) => {
            console.log('requester hs sent a message')
            reconcilerRef.current?.postMessage({
                type: 'RECONCILE_PART_DATA',
                payload: event.data.payload
            })
        };

        reconcilerRef.current = new Worker(
            new URL("../../workers/reconciler.ts", import.meta.url)
        );

        reconcilerRef.current.onmessage = (event: MessageEvent<any>) => {
            console.log("Reconciler Worker said:", event.data);
            getCatalog().then((parts: Part[]) => {
                console.log('use catalog', parts);
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

    return {
        catalog
    };
}