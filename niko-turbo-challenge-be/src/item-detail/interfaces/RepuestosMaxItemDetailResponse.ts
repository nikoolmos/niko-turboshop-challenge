export interface RepuestosMaxItemDetailResponse {
    exito:     boolean;
    consulta:  Consulta;
    resultado: Resultado;
}

export interface Consulta {
    id:                string;
    fechaHora:         Date;
    parametros:        Parametros;
    tiempoRespuestaMs: number;
}

export interface Parametros {
    codigo: string;
}

export interface Resultado {
    cantidadTotal: number;
    productos:     Producto[];
}

export interface Producto {
    identificacion:    Identificacion;
    informacionBasica: InformacionBasica;
    precio:            Precio;
    inventario:        Inventario;
    caracteristicas:   Caracteristicas;
    multimedia:        Multimedia;
    compatibilidad:    Compatibilidad;
}

export interface Caracteristicas {
    peso:             Peso;
    especificaciones: Especificaciones;
}

export interface Especificaciones {
    type: string;
}

export interface Peso {
    valor:  number;
    unidad: string;
}

export interface Compatibilidad {
    vehiculos: Vehiculo[];
}

export interface Vehiculo {
    fabricante: string;
    modelo:     string;
    anios:      Anios;
    motor?:     string;
    version?:   string;
}

export interface Anios {
    desde: number;
    hasta: number;
}

export interface Identificacion {
    codigoInterno: string;
    sku:           string;
    codigoOEM:     string;
}

export interface InformacionBasica {
    nombre:      string;
    descripcion: string;
    marca:       Marca;
    categoria:   Categoria;
}

export interface Categoria {
    nombre: string;
    id:     string;
}

export interface Marca {
    nombre: string;
}

export interface Inventario {
    cantidad:               number;
    estado:                 string;
    ubicacion:              Ubicacion;
    tiempoDespachoEstimado: string;
}

export interface Ubicacion {
    bodega: string;
    sector: string;
}

export interface Multimedia {
    imagenes: Imagene[];
}

export interface Imagene {
    url:  string;
    tipo: string;
}

export interface Precio {
    valor:               number;
    moneda:              string;
    incluyeIVA:          boolean;
    descuentoDisponible: boolean;
}
