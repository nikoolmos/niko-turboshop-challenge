"use client";

self.onmessage = (e: MessageEvent<number>) => {

    setInterval(() => {
        self.postMessage({
            data: {
                type: 'TRIGGER_CATALOG_REQUEST'
            }
        });
    }, 10000);
  
};

export {}; // Ensure this is treated as a module