export interface GlobalPartsItemDetailResponse {
    ResponseEnvelope: ResponseEnvelope;
}

export interface ResponseEnvelope {
    Header: Header;
    Body:   Body;
    Footer: Footer;
}

export interface Body {
    SearchResults: SearchResults;
}

export interface SearchResults {
    TotalCount: number;
    PageInfo:   PageInfo;
    Items:      Item[];
}

export interface Item {
    ItemHeader:              ItemHeader;
    ProductDetails:          ProductDetails;
    PricingInfo:             PricingInfo;
    AvailabilityInfo:        AvailabilityInfo;
    PhysicalAttributes:      PhysicalAttributes;
    TechnicalSpecifications: TechnicalSpecifications;
    MediaAssets:             MediaAssets;
    VehicleCompatibility:    VehicleCompatibility;
}

export interface AvailabilityInfo {
    StockStatus:   StockStatus;
    QuantityInfo:  QuantityInfo;
    WarehouseInfo: WarehouseInfo;
    ShippingInfo:  ShippingInfo;
}

export interface QuantityInfo {
    AvailableQuantity: number;
    ReservedQuantity:  number;
    MinOrderQuantity:  number;
    MaxOrderQuantity:  number;
}

export interface ShippingInfo {
    EstimatedShipDate:     Date;
    EstimatedDeliveryDays: number;
    ShippingMethods:       string[];
}

export interface StockStatus {
    Code:        string;
    Description: string;
}

export interface WarehouseInfo {
    PrimaryWarehouse: PrimaryWarehouse;
}

export interface PrimaryWarehouse {
    Name:    string;
    Code:    string;
    Country: string;
}

export interface ItemHeader {
    InternalId:         string;
    ExternalReferences: ExternalReferences;
}

export interface ExternalReferences {
    SKU: Sku;
    OEM: OEM;
}

export interface OEM {
    Value:        string;
    Manufacturer: string;
}

export interface Sku {
    Value: string;
    Type:  string;
}

export interface MediaAssets {
    Images: Image[];
}

export interface Image {
    ImageId:    string;
    ImageUrl:   string;
    ImageType:  string;
    Resolution: string;
    IsPrimary:  boolean;
}

export interface PhysicalAttributes {
    Weight: Weight;
}

export interface Weight {
    Value:    number;
    Unit:     string;
    UnitCode: string;
}

export interface PricingInfo {
    ListPrice:    ListPrice;
    TaxInfo:      TaxInfo;
    DiscountInfo: DiscountInfo;
}

export interface DiscountInfo {
    DiscountAvailable:  boolean;
    MaxDiscountPercent: number;
}

export interface ListPrice {
    Amount:         number;
    CurrencyCode:   string;
    CurrencySymbol: string;
}

export interface TaxInfo {
    TaxIncluded: boolean;
    TaxRate:     number;
    TaxAmount:   number;
}

export interface ProductDetails {
    NameInfo:     NameInfo;
    Description:  Description;
    BrandInfo:    BrandInfo;
    CategoryInfo: CategoryInfo;
}

export interface BrandInfo {
    BrandName: string;
    BrandCode: string;
    IsOEM:     boolean;
}

export interface CategoryInfo {
    PrimaryCategory: PrimaryCategory;
    SubCategory:     PrimaryCategory;
}

export interface PrimaryCategory {
    Name: string;
    Code: string;
}

export interface Description {
    FullText: string;
    Language: string;
}

export interface NameInfo {
    DisplayName:   string;
    ShortName:     string;
    TechnicalName: string;
}

export interface TechnicalSpecifications {
    SpecificationList: SpecificationList[];
}

export interface SpecificationList {
    SpecificationName:  string;
    SpecificationValue: string;
}

export interface VehicleCompatibility {
    CompatibilityCount: number;
    CompatibleVehicles: CompatibleVehicle[];
}

export interface CompatibleVehicle {
    VehicleId:          string;
    Manufacturer:       PrimaryCategory;
    Model:              PrimaryCategory;
    YearRange:          YearRange;
    CompatibilityNotes: string;
}

export interface YearRange {
    StartYear: number;
    EndYear:   number;
}

export interface PageInfo {
    CurrentPage:  number;
    TotalPages:   number;
    ItemsPerPage: number;
}

export interface Footer {
    ResponseStatus: ResponseStatus;
    Pagination:     Pagination;
    RateLimitInfo:  RateLimitInfo;
}

export interface Pagination {
    HasMoreResults: boolean;
}

export interface RateLimitInfo {
    RemainingRequests: number;
    ResetTimestamp:    Date;
}

export interface ResponseStatus {
    StatusCode:    string;
    StatusMessage: string;
}

export interface Header {
    TransactionId:     string;
    Timestamp:         Date;
    RequestInfo:       RequestInfo;
    ProcessingMetrics: ProcessingMetrics;
}

export interface ProcessingMetrics {
    LatencyMilliseconds: number;
    ServerNode:          string;
    CacheHit:            boolean;
}

export interface RequestInfo {
    Method:     string;
    Endpoint:   string;
    Parameters: Parameters;
}

export interface Parameters {
    PartNumber: string;
}
