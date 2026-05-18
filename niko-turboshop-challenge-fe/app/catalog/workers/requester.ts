"use client";

let url:URL;

interface RequesterWorkerDataInit {
    type: 'INIT';
    payload: {baseUrl: string};
}

interface RequesterWorkerNewParams {
    type: 'NEW_PARAMS';
    payload: { page: string; limit: string;};
}

interface RequesterWorkerDataTriggerRequest {
    type: 'TRIGGER_CATALOG_REQUEST';
    payload: never;
}

type RequesterWorkerData = RequesterWorkerDataInit | RequesterWorkerNewParams | RequesterWorkerDataTriggerRequest; 

self.onmessage = (e: MessageEvent<RequesterWorkerData>) => {
    switch (e.data.type) {
        case "INIT":
            url = new URL(`${e.data.payload.baseUrl}/catalog`);
            break; 
        case "NEW_PARAMS":
            url.searchParams.set('page', e.data.payload.page);
            url.searchParams.set('limit', e.data.payload.limit);
            break;
        case "TRIGGER_CATALOG_REQUEST":
            self.fetch(url).then(response => response.json())
                .then(response => {
                    self.postMessage({
                        payload: response
                    });
                })
                .catch(error => {
                    console.error(error)
                });
            break;
    }
};

export { };