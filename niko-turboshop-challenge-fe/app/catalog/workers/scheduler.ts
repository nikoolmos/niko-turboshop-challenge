"use client";

self.onmessage = (e: MessageEvent<number>) => {

    console.log("event in scheduler", e.data);
    setInterval(() => {
        console.log('ON SCHEDULER');
        self.postMessage({
            data: {
                type: 'TRIGGER_CATALOG_REQUEST'
            }
        });
    }, 5000);
  
};

export {}; // Ensure this is treated as a module