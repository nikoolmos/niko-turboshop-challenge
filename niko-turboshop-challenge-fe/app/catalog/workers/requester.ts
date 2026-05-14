"use client";

self.onmessage = (e: MessageEvent<any>) => {

    console.log('event on requester', e)
    if(e.data.type === 'TRIGGER_CATALOG_REQUEST') {

        const url = new URL('http://localhost:3000/catalog?page=1&limit=20');
        self.fetch(url).then(response =>  response.json())
        .then(response => {
            self.postMessage({ 
                payload: response
            });
            console.log('REQUESTER: ', response);
        })
        .catch(error => {
            console.error(error)
        })
    
    }

};

export {};