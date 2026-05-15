"use client";

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

interface ReconcilePartData {
    type: 'RECONCILE_PART_DATA',
    payload: Part[],
}

const DB_NAME = 'niko-turboshop-challenge-db';
const DB_VERSION = 1;

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

export const updateCatalog = async (map: Map<string, Part>) => {
    const db = await openDB();

    const transaction = db.transaction('parts', 'readwrite');
    const store = transaction.objectStore('parts');

    for (const part of map) {
       await new Promise((resolve, reject) => {
            const request = store.put(part[1]);
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

};

self.onmessage = (e: MessageEvent<ReconcilePartData>) => {
console.log('reconciler', e)
    if (e.data.type === "RECONCILE_PART_DATA") {
        const { payload } = e.data;

        const newPartsMap = new Map();
        const oldPartsMap = new Map();

        for (const part of payload) {
            newPartsMap.set(part.id, part);
        }

        getCatalog().then(async (catalog) => {

            for (const part of payload) {
                oldPartsMap.set(part.id, part);
            }

            for (const part of newPartsMap) {
                oldPartsMap.set(part[0], part[1]);
            }

            await updateCatalog(oldPartsMap);

        }).then(() => {
            self.postMessage('CATALOG_DB_UPDATED');
        });
    }
};

export { };