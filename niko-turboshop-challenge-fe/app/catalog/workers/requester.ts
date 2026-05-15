"use client";

self.onmessage = (e: MessageEvent<any>) => {

    if(e.data.type === 'TRIGGER_CATALOG_REQUEST') {

        const url = new URL('http://localhost:3000/catalog?page=1&limit=20');
        self.fetch(url).then(response =>  response.json())
        .then(response => {
            self.postMessage({ 
                payload: response
            });
        })
        .catch(error => {
            console.error(error)
        })
    
    }

};

export {};