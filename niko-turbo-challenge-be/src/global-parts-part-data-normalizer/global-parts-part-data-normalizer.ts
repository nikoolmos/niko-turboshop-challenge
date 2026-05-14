import { PartProviders } from "src/constants/part-providers-enum";
import { PartDataNormalizer } from "src/part-data-normalizer/part-data-normalizer.interface";
import { PartDataSource } from "src/part-data-source/part-data-source";
import { Part } from "src/part/part.interface";

export interface GlobalPartsCatalogResponse {
    ResponseEnvelope: ResponseEnvelope;
}

export interface ResponseEnvelope {
    Header: Header;
    Body: Body;
    Footer: Footer;
}

export interface Body {
    CatalogListing: CatalogListing;
}

export interface CatalogListing {
    TotalItems: number;
    PaginationInfo: PaginationInfo;
    Items: Item[];
}

export interface Item {
    ItemHeader: ItemHeader;
    ProductDetails: ProductDetails;
    PricingInfo: PricingInfo;
    AvailabilityInfo: AvailabilityInfo;
    PhysicalAttributes: PhysicalAttributes;
    TechnicalSpecifications: TechnicalSpecifications;
    MediaAssets: MediaAssets;
    VehicleCompatibility: VehicleCompatibility;
}

export interface AvailabilityInfo {
    StockStatus: StockStatus;
    QuantityInfo: QuantityInfo;
    WarehouseInfo: WarehouseInfo;
    ShippingInfo: ShippingInfo;
}

export interface QuantityInfo {
    AvailableQuantity: number;
    ReservedQuantity: number;
    MinOrderQuantity: number;
    MaxOrderQuantity: number;
}

export interface ShippingInfo {
    EstimatedShipDate: Date;
    EstimatedDeliveryDays: number;
    ShippingMethods: ShippingMethod[];
}

export enum ShippingMethod {
    Express = "EXPRESS",
    Pickup = "PICKUP",
    Standard = "STANDARD",
}

export interface StockStatus {
    Code: StockStatusCode;
    Description: DescriptionEnum;
}

export enum StockStatusCode {
    CriticalLow = "CRITICAL_LOW",
    InStock = "IN_STOCK",
    LowStock = "LOW_STOCK",
}

export enum DescriptionEnum {
    DisponibleEnStock = "Disponible en stock",
    StockBajo = "Stock bajo",
    StockCríticoPocasUnidades = "Stock crítico - pocas unidades",
}

export interface WarehouseInfo {
    PrimaryWarehouse: PrimaryWarehouse;
}

export interface PrimaryWarehouse {
    Name: Name;
    Code: PrimaryWarehouseCode;
    Country: Country;
}

export enum PrimaryWarehouseCode {
    SclCtr = "SCL-CTR",
    SclEst = "SCL-EST",
    SclNrt = "SCL-NRT",
    SclSur = "SCL-SUR",
}

export enum Country {
    Cl = "CL",
}

export enum Name {
    BodegaEste = "Bodega Este",
    BodegaNorte = "Bodega Norte",
    BodegaSur = "Bodega Sur",
    SantiagoCentro = "Santiago Centro",
}

export interface ItemHeader {
    InternalId: string;
    ExternalReferences: ExternalReferences;
}

export interface ExternalReferences {
    SKU: Sku;
    OEM: OEM;
}

export interface OEM {
    Value: string;
    Manufacturer: string;
}

export interface Sku {
    Value: string;
    Type: Type;
}

export enum Type {
    InternalSku = "INTERNAL_SKU",
}

export interface MediaAssets {
    Images: Image[];
}

export interface Image {
    ImageId: string;
    ImageUrl: string;
    ImageType: ImageType;
    Resolution: Resolution;
    IsPrimary: boolean;
}

export enum ImageType {
    Primary = "PRIMARY",
}

export enum Resolution {
    The1024X1024 = "1024x1024",
}

export interface PhysicalAttributes {
    Weight: Weight;
}

export interface Weight {
    Value: number;
    Unit: Unit;
    UnitCode: UnitCode;
}

export enum Unit {
    Kg = "kg",
}

export enum UnitCode {
    Kgm = "KGM",
}

export interface PricingInfo {
    ListPrice: ListPrice;
    TaxInfo: TaxInfo;
    DiscountInfo: DiscountInfo;
}

export interface DiscountInfo {
    DiscountAvailable: boolean;
    MaxDiscountPercent: number;
}

export interface ListPrice {
    Amount: number;
    CurrencyCode: CurrencyCode;
    CurrencySymbol: CurrencySymbol;
}

export enum CurrencyCode {
    Clp = "CLP",
}

export enum CurrencySymbol {
    Empty = "$",
}

export interface TaxInfo {
    TaxIncluded: boolean;
    TaxRate: number;
    TaxAmount: number;
}

export interface ProductDetails {
    NameInfo: NameInfo;
    Description: DescriptionClass;
    BrandInfo: BrandInfo;
    CategoryInfo: CategoryInfo;
}

export interface BrandInfo {
    BrandName: string;
    BrandCode: string;
    IsOEM: boolean;
}

export interface CategoryInfo {
    PrimaryCategory: PrimaryCategory;
    SubCategory: PrimaryCategory;
}

export interface PrimaryCategory {
    Name: string;
    Code: string;
}

export interface DescriptionClass {
    FullText: string;
    Language: Language;
}

export enum Language {
    EsCL = "es-CL",
}

export interface NameInfo {
    DisplayName: string;
    ShortName: string;
    TechnicalName: string;
}

export interface TechnicalSpecifications {
    SpecificationList: SpecificationList[];
}

export interface SpecificationList {
    SpecificationName: string;
    SpecificationValue: string;
}

export interface VehicleCompatibility {
    CompatibilityCount: number;
    CompatibleVehicles: CompatibleVehicle[];
}

export interface CompatibleVehicle {
    VehicleId: VehicleID;
    Manufacturer: PrimaryCategory;
    Model: PrimaryCategory;
    YearRange: YearRange;
    EngineInfo?: EngineInfo;
    TrimLevel?: TrimLevel;
    CompatibilityNotes: CompatibilityNotes;
}

export enum CompatibilityNotes {
    VerificarAñoExactoDelVehículoAntesDeComprar = "Verificar año exacto del vehículo antes de comprar",
}

export interface EngineInfo {
    Description: string;
    Displacement: string;
}

export interface TrimLevel {
    Name: string;
}

export enum VehicleID {
    Veh11778720668583 = "VEH-1-1778720668583",
    Veh21778720668583 = "VEH-2-1778720668583",
    Veh31778720668583 = "VEH-3-1778720668583",
}

export interface YearRange {
    StartYear: number;
    EndYear: number;
}

export interface PaginationInfo {
    CurrentPage: number;
    TotalPages: number;
    ItemsPerPage: number;
    HasNextPage: boolean;
    HasPreviousPage: boolean;
}

export interface Footer {
    ResponseStatus: ResponseStatus;
    Pagination: Pagination;
    RateLimitInfo: RateLimitInfo;
}

export interface Pagination {
    HasMoreResults: boolean;
}

export interface RateLimitInfo {
    RemainingRequests: number;
    ResetTimestamp: Date;
}

export interface ResponseStatus {
    StatusCode: string;
    StatusMessage: string;
}

export interface Header {
    TransactionId: string;
    Timestamp: Date;
    RequestInfo: RequestInfo;
    ProcessingMetrics: ProcessingMetrics;
}

export interface ProcessingMetrics {
    LatencyMilliseconds: number;
    ServerNode: string;
    CacheHit: boolean;
}

export interface RequestInfo {
    Method: string;
    Endpoint: string;
    Parameters: Parameters;
}

export interface Parameters {
    Page: number;
    ItemsPerPage: number;
}



export class GlobalPartsPartDataNormalizer implements PartDataNormalizer<GlobalPartsCatalogResponse> {
    normalizeCatalogData(catalogData: GlobalPartsCatalogResponse): Part[] {
        const partList: Part[] = [];

        const items = catalogData.ResponseEnvelope.Body.CatalogListing.Items;

        for (const part of items) {
            partList.push({
                description: part.ProductDetails.Description.FullText,
                title: part.ProductDetails.NameInfo.DisplayName,
                sku: part.ItemHeader.ExternalReferences.SKU.Value,
                id: part.ItemHeader.ExternalReferences.SKU.Value,
                picture: [part.MediaAssets.Images[0].ImageUrl],
                price: part.PricingInfo.ListPrice.Amount,
                providers: [PartProviders.GLOBAL_PARTS],
                qty: part.AvailabilityInfo.QuantityInfo.AvailableQuantity
            })
        }

        return partList;
    }
}
