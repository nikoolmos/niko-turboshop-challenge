"use client";

import { Part } from "../interfaces/part";

const DB_NAME = 'niko-turboshop-challenge-db';
const DB_VERSION = 1;

export const openDB = (): Promise<IDBDatabase> => {
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

export const getCatalog = async () => {
    const db = await openDB();
    const transaction = db.transaction('parts', 'readonly');
    const store = transaction.objectStore('parts');

    const request = store.getAll();

    return new Promise<Part[]>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

