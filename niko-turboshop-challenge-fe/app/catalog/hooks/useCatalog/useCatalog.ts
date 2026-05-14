"use client";

import { useEffect, useRef } from "react";

export default function useCatalog() {
    const workerRef = useRef<Worker | null>(null);
    const requesterRef = useRef<Worker | null>(null);
    const reconcilerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // 1. Initialize the worker using a relative path and import.meta.url
        workerRef.current = new Worker(
            new URL("../../workers/scheduler.ts", import.meta.url)
        );

        // 2. Listen for messages from the worker
        workerRef.current.onmessage = (event: MessageEvent<number>) => {
           requesterRef.current?.postMessage({
                type: 'TRIGGER_CATALOG_REQUEST'
        })
        };

        workerRef.current?.postMessage(10); // Send data to worker

        // 3. Cleanup: Terminate worker when component unmounts
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    useEffect(() => {
        // 1. Initialize the worker using a relative path and import.meta.url
        requesterRef.current = new Worker(
            new URL("../../workers/requester.ts", import.meta.url)
        );

        // 2. Listen for messages from the worker
        requesterRef.current.onmessage = (event: MessageEvent<any>) => {
            reconcilerRef.current?.postMessage({
                type: 'RECONCILE_PART_DATA',
                payload:  event.data.payload
            })
        };

        requesterRef.current?.postMessage(10); // Send data to worker

        // 3. Cleanup: Terminate worker when component unmounts
        return () => {
            requesterRef.current?.terminate();
        };
    }, []);

     useEffect(() => {
        reconcilerRef.current = new Worker(
            new URL("../../workers/reconciler.ts", import.meta.url)
        );

        reconcilerRef.current.onmessage = (event: MessageEvent<number>) => {
            console.log("Worker said:", event.data);
        };

        return () => {
            reconcilerRef.current?.terminate();
        };
    }, []);

    const handleWork = () => {
        requesterRef.current?.postMessage(10); // Send data to worker
    };

    return {
        handleWork
    };
}