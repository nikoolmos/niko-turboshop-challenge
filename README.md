# niko-turboshop-challenge

> Mi solución al desafío técnico de ingreso al equipo de Turboshop.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/85cca9c3-51f5-47d0-94dc-261d78fb24ad" />


## Generalidades

* La mayor parte del proyecto fue realizado integramente a mano.
* Se utilizó muy poca Inteligencia Artíficial.
* Se utilizó Gemini en su versión gratuita y de respuesta rápida como medio de consulta técnica, para resolver dudas o generar algunos componentes básicos (Por ejemplo: `<Loader/>`).
* La arquitectura general del frontend fue variando a medida que fue avanzando en el proyecto. Estas variaciones son apreciables en el git log.
* Al comienzo la arquitectura del front utilizaba varios web workers para simular el real-time, esto luego fue descartado pero quedan reminisencias de lo que fue ese código.
* El real-time se implementó realizando un polling constante del backend al no saber si era posible utilizar web-sockets para poder resolver el desafío.
* El comportamiento real-time se encuentra encapsulado solamente en los componentes que necesitan ese comportamiento. De manera tal que cuando el componente con real-time no es renderizado, el polling se detiene automáticamente. Esto se realizó así como forma de proteger la performance total del sistema.
* En caso de falla de una de los endpoints del real-time, se decidió utilizar un valor por defecto.
* Al comienzo del proyecto, opté por utilizar IndexedDB para el almacenamiento local de la información del catálogo, descarté esa idea con el avance del proyecto. Esa implementación sigue disponible dentro del git log.


## Demo en vivo

El sistema se encuentra desplegado en Railway.

Los enlaces de acceso son los siguientes:

### Frontend

```
https://niko-turboshop-challenge-fe-production.up.railway.app
```

### Backend

```
https://niko-turboshop-challenge-be-production.up.railway.app
```
## Instrucciones de ejecución

### Frontend

Dirigirse al directorio del frontend y ejecutar los siguientes comandos:

```
$ yarn build
$ yarn start
```
La aplicación debería servirse en el puerto TCP `3001`.

### Backend

Dirigirse al directorio del backend y ejecutar los siguientes comandos:

```
$ yarn start
```

La aplicación debería servirse en el puerto TCP `3000`.


## Backend

El backend normaliza los datos de los diferentes proveedores en una única estructura.
Dicha estructura es servida al frontend.

Se creó una carpeta para cada endpoint de manera tal que el código se encuentre
organizado y los diferentes recursos modularizados de esta manera.

### Catálogo

* No se siguió ningún tipo de arquitectura específica, simplemente se respetaron los principios SOLID.
* Se creó una clase que tiene la responsabilidad de realizar las consultas a los backends de los proveedores.
* Se creó una clase para cada prooveedro que tiene la responsabilidad de realizar la normalización de los datos de ese proveedor específico.
* La información de como se debe invocar a cada proveedor específico fue almacenada esn un archivo de configuración dentro de la carpeta específica para el catálogo.
* Se optó por no mezclar la lógica de negocio con la arquitectura propuesta por Nest.js porlo que se generó una clase llamada entrypoint, la cual tiene la finalidad de encapsular y servir de fachada(facade) para el resto del sistema.


### Detalle de ítem

* Se intentó seguir una aquitectura más parecida a Clean Architecture. Aunque ciertamente hacen falta más interfaces para poder considerarla como tal.
* De la misma manera en la que se hizo con el catálogo, se implementó una clase normalizadora para cada proveedor.


### Datos en tiempo real

* Se implementaron dos endpoints diferentes que son expuestos al frontend. Uno de ellos se encarga de servir el precio de un item y el otro la cantidad disponible.

## Endpoints


### GET CATALOG

Sirve para obtener el catalogo de partes de los proveedores.

```
GET /catalog?limit={}&page={}
```

* Siendo `limit` la cantidad máxima de elementos a retornar.
* Siendo `page` la página a retornar de todas las disponibles.

#### Respuesta

Se presenta un ejemplo de respuesta:

```
{
    "totalPages": 2,
    "currentPage": "1",
    "parts": [
        {
            "id": "93794-M27",
            "description": "Compresor de Aire Trasero nuevo de la marca Sanden para máximo rendimiento",
            "picture": [
                "https://example.com/images/cl-moc6krmr-1.jpg"
            ],
            "price": 355804,
            "providers": [
                "AUTO_PARTS_PLUS"
            ],
            "qty": 16,
            "sku": "CL-MOC6KRMR",
            "title": "Compresor de Aire Trasero",
            "brand": "Sanden",
            "year": [
                {
                    "from": "2012",
                    "upTo": "2022"
                },
                {
                    "from": "2003",
                    "upTo": "2008"
                },
                {
                    "from": "2004",
                    "upTo": "2009"
                }
            ],
            "model": [
                "Mitsubishi Mirage ",
                "Honda Fit ",
                "BMW X3 "
            ]
        },
        ...
    ]
}
```


### GET ITEM DETAIL

Sirve para obtener los detalles de una parte.


```
GET /item-detail?id={}&provider={}
```

* Siendo `id` el sku del item a consultar.
* Siendo el `provider` el stirng de una constante con el nombre del proovedor que tiene el artículo.

Los valores posibles para `provider` son:

```
    AUTO_PARTS_PLUS 
    REPUESTOS_MAX 
    GLOBAL_PARTS 
```

#### Respuesta 

Se presenta un ejemplo de respuesta:


```
{
    "partId": "APP-CL-MOC6KRMR",
    "sku": "CL-MOC6KRMR",
    "oemCode": "93794-M27",
    "title": "Compresor de Aire Trasero",
    "desc": "Compresor de Aire Trasero nuevo de la marca Sanden para máximo rendimiento",
    "brandName": "Sanden",
    "categoryName": "Climatización",
    "unitPrice": 355804,
    "currencyCode": "CLP",
    "qtyAvailable": 16,
    "warehouseLocation": "Santiago Centro",
    "weightValue": 12.9,
    "weightUnit": "kg",
    "imgUrls": [
        "https://example.com/images/cl-moc6krmr-1.jpg"
    ],
    "fitsVehicles": [
        "Mitsubishi Mirage 2012-2022 4.0L V6 LX",
        "Honda Fit 2003-2008 2.5L",
        "BMW X3 2004-2009 1.6L"
    ]
}
```

### GET PRICE

Sirve para obtener la precio(monto y moneda) en tiempo real.

```
GET /price?sku={}&provider={}
```

* Siendo `sku` el sku del item a consultar.
* Siendo el `provider` el stirng de una constante con el nombre del proovedor que tiene el artículo.

Los valores posibles para `provider` son:

```
    AUTO_PARTS_PLUS 
    REPUESTOS_MAX 
    GLOBAL_PARTS 
```


#### Respuesta

Se presenta un ejemplo de respuesta:

```
{
    "price": 355804,
    "currencyCode": "CLP"
}
```

### GET QUANTITY

Sirve para obtener la cantidad disponible en tiempo real.

```
GET /quantity?sku={}&provider={}
```

* Siendo `sku` el sku del item a consultar.
* Siendo el `provider` el stirng de una constante con el nombre del proovedor que tiene el artículo.

Los valores posibles para `provider` son:

```
    AUTO_PARTS_PLUS 
    REPUESTOS_MAX 
    GLOBAL_PARTS 
```


#### Respuesta

Se presenta un ejemplo de respuesta:

```
{
    "quantity": 16
}
```



