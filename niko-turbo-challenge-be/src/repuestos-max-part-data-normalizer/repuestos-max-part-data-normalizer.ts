import { PartProviders } from "src/constants/part-providers-enum";
import { PartDataNormalizer } from "src/part-data-normalizer/part-data-normalizer.interface";
import { Part } from "src/part/part.interface";

export interface RepuestosMaxCatalogResponse {
    exito: boolean;
    consulta: Consulta;
    paginacion: Paginacion;
    productos: Producto[];
}

export interface Consulta {
    id: string;
    fechaHora: Date;
    tiempoRespuestaMs: number;
}

export interface Paginacion {
    totalProductos: number;
    totalPaginas: number;
    paginaActual: number;
    productosPorPagina: number;
    tieneSiguiente: boolean;
    tieneAnterior: boolean;
}

export interface Producto {
    identificacion: Identificacion;
    informacionBasica: InformacionBasica;
    precio: Precio;
    inventario: Inventario;
    caracteristicas: Caracteristicas;
    multimedia: Multimedia;
    compatibilidad: Compatibilidad;
}

export interface Caracteristicas {
    peso: Peso;
    especificaciones: Especificaciones;
}

export interface Especificaciones {
    type?: Type;
    electrodeType?: string;
    gap?: string;
    material?: string;
    thickness?: string;
    voltage?: string;
    capacity?: string;
    filterType?: string;
    diameter?: string;
    position?: string;
}

export enum Type {
    Aire = "Aire",
    Estándar = "Estándar",
}

export interface Peso {
    valor: number;
    unidad: Unidad;
}

export enum Unidad {
    Kg = "kg",
}

export interface Compatibilidad {
    vehiculos: Vehiculo[];
}

export interface Vehiculo {
    fabricante: string;
    modelo: string;
    anios: Anios;
    motor?: string;
    version?: string;
}

export interface Anios {
    desde: number;
    hasta: number;
}

export interface Identificacion {
    codigoInterno: string;
    sku: string;
    codigoOEM: string;
}

export interface InformacionBasica {
    nombre: string;
    descripcion: string;
    marca: Marca;
    categoria: Categoria;
}

export interface Categoria {
    nombre: string;
    id: string;
}

export interface Marca {
    nombre: string;
}

export interface Inventario {
    cantidad: number;
    estado: Estado;
    ubicacion: Ubicacion;
    tiempoDespachoEstimado: TiempoDespachoEstimado;
}

export enum Estado {
    Disponible = "disponible",
    StockBajo = "stock_bajo",
}

export enum TiempoDespachoEstimado {
    The23DíasHábiles = "2-3 días hábiles",
    The2448Horas = "24-48 horas",
    The57DíasHábiles = "5-7 días hábiles",
}

export interface Ubicacion {
    bodega: Bodega;
    sector: string;
}

export enum Bodega {
    BodegaEste = "Bodega Este",
    BodegaNorte = "Bodega Norte",
    BodegaSur = "Bodega Sur",
    SantiagoCentro = "Santiago Centro",
}

export interface Multimedia {
    imagenes: Imagene[];
}

export interface Imagene {
    url: string;
    tipo: Tipo;
}

export enum Tipo {
    Principal = "principal",
}

export interface Precio {
    valor: number;
    moneda: Moneda;
    incluyeIVA: boolean;
    descuentoDisponible: boolean;
}

export enum Moneda {
    Clp = "CLP",
}

export class RepuestosMaxPartDataNormalizer implements PartDataNormalizer<RepuestosMaxCatalogResponse> {
    normalizeCatalogData(catalogData: RepuestosMaxCatalogResponse): Part[] {
        const partList: Part[] = [];
        
        for(const part of catalogData.productos) {
            partList.push({
                description: part.informacionBasica.descripcion,
                title: part.informacionBasica.nombre,
                providers: [PartProviders.REPUESTOS_MAX.toString()],
                id: part.identificacion.sku,
                picture: [part.multimedia.imagenes[0].url],
                price: part.precio.valor,
                qty: part.inventario.cantidad,
                sku: part.identificacion.sku,
                brand: part.informacionBasica.marca.nombre,
                year: part.compatibilidad.vehiculos.map(vehicle => ({from: vehicle.anios.desde.toString(), upTo: vehicle.anios.hasta.toString()})),
                model: part.compatibilidad.vehiculos.map(vehicle => vehicle.modelo),
            });
        }

        return partList;
    }
}
