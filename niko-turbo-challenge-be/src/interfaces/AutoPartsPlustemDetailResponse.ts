export interface AutoPartsPlustemDetailResponse {
    success:       boolean;
    request_id:    string;
    timestamp:     Date;
    latency_ms:    number;
    total_results: number;
    parts:         Part[];
}

export interface Part {
    part_id:            string;
    sku:                string;
    oem_code:           string;
    title:              string;
    desc:               string;
    brand_name:         string;
    category_name:      string;
    unit_price:         number;
    currency_code:      string;
    qty_available:      number;
    warehouse_location: string;
    weight_value:       number;
    weight_unit:        string;
    img_urls:           string[];
    fits_vehicles:      string[];
    spec_keys:          string[];
    spec_values:        string[];
}
