export type EvalModelKey = "dividendB" | "dividendPs" | "cashFlowB" | "cashFlowPs" | "earningsB" | "earningsPs"| "salesB" | "salesPs";
export type EvalModel = { value: EvalModelKey; label: string; marketCap?: boolean; };

export interface IntrincValueBaseData  {
    model: EvalModelKey;
    shares?: number|null;
    value?: number;
    years: number;
    compound: boolean;
    discountRate: number;
    fairValueWeigth?: number;
};
export interface  IntrincValueDetailData { 
    growthRate: number;
    growthDecline: number;
    weight: number;
    finalMultiple: number;
    fairValue?: number;
};
export interface  IntrincValueData extends IntrincValueBaseData, IntrincValueDetailData { 
};
export const EvalModelValues: EvalModel[] = [
    //{value:"dividendB", label: "Dividend (Bilions)", marketCap: true},
    //{value:"dividendPs", label: "Dividend (Per Share)", marketCap: false},
    {value:"cashFlowB", label: "CashFlow (Milions)", marketCap: true},
    {value:"cashFlowPs", label: "CashFlow (Per Share)", marketCap: false},
    {value:"earningsB", label: "Earnings (Milions)", marketCap: true},
    {value:"earningsPs", label: "Earnings (Per Share)", marketCap: false},
    {value:"salesB", label: "Sales (Milions)", marketCap: true},
    {value:"salesPs", label: "Sales (Per Share)", marketCap: false},
  ];