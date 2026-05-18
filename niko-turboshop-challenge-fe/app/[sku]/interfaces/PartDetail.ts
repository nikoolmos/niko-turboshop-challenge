export interface PartDetail {
    partId: string;
    sku: string;
    oemCode: string;
    title: string;
    desc: string;
    brandName: string;
    categoryName: string;
    unitPrice: number;
    currencyCode: string;
    qtyAvailable: number;
    warehouseLocation: string;
    weightValue: number;
    weightUnit: string;
    imgUrls: string[];
    fitsVehicles: string[];
};