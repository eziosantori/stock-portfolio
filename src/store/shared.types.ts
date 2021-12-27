export interface LookUp<TValue>{
    value: TValue;
    label: string;
}
export interface Tag{
    value: string;
}

export const Sectors: LookUp<string>[] = [
    { value: "energy", label: "Energy" },
    { value: "materials", label: "Materials" },
    { value: "industrials", label: "Industrials" },
    { value: "utilities", label: "Utilities" },
    { value: "healthcare", label: "Healthcare" },
    { value: "financials", label: "Financials" },
    { value: "consumerDiscretionary", label: "Consumer Discretionary" },
    { value: "consumerStaples", label: "Consumer Staples" },
    { value: "informationTechnology", label: "Information Technology" },
    { value: "communicationServices", label: "Communication Services" },
    { value: "realEstate", label: "Real Estate" },
];

export const StockTypes: LookUp<string>[] = [
    { value: "slowGrowers", label: "Slow Growers" },
    { value: "stalwarts", label: "Salwarts" },
    { value: "fastGrowers", label: "Fast Growers" },
    { value: "cyclical", label: "Cyclical" },
    { value: "assetPalys", label: "Asset Plays" },
    { value: "turnarounds", label: "Turnarounds" },
];

export const defaultTags: Tag[] = [
    { value: "portfolio" },
    { value: "bond stock" },
    { value: "watchlist" },
    { value: "gold" },
    { value: "spawner" },
    { value: "reits" }
]