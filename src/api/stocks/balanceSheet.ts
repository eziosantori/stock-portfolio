export const getBalanceSheet = async (symbol: string): Promise<BalanceSheet> => {
    const res = await fetch(`/api/balance-sheet?symbol=${symbol}`);
    return await res.json();
}
export interface BalanceSheet {
    synmbol: string;
    balanceSheet: BalanceSheetItem[];
}
export interface BalanceSheetItem {
    reportDate: Date;
    filingType: string;
    fiscalDate: string;
    fiscalQuarter: number;
    fiscalYear: number;
    currency: string;
    /**Represents current cash excluding short-term investments. Current cash excludes commercial paper issued by unconsolidated subsidiaries to the parent company, amount due from sale of debentures, checks written by the company but not yet deposited and charged to the company’s bank account, and promissory notes. */
    currentCash: number;
    shortTermInvestments?: number;
    /**Represents net claims against customers for merchandise sold or services performed in the ordinary course of business. Investopedia */
    receivables: number;
    /**
     * Represents tangible items or merchandise net of advances and obsolescence acquired for either resale directly or included in the production of finished goods manufactured for sale in the normal course of operation. Excludes tools that are listed in current assets, supplies and prepaid expenses for companies that lump these items together, advances from customers, and contract billings. For non-U.S. companies, if negative inventories arise from advances from customers greater than costs on long-term contracts, it is reclassified to current liabilities.
     */
    inventory: number;
    otherCurrentAssets: number;
    currentAssets: number;
    longTermInvestments: number;
    propertyPlantEquipment: number;
    goodwill?: number;
    intangibleAssets?: number;
    otherAssets: number;
    totalAssets: number;
    accountsPayable: number;
    currentLongTermDebt?: number;
    otherCurrentLiabilities?: number;
    totalCurrentLiabilities: number;
    longTermDebt: number;
    otherLiabilities?: number;
    minorityInterest: number;
    totalLiabilities: number;
    commonStock: number;
    retainedEarnings: number;
    treasuryStock?: number;
    capitalSurplus?: number;
    shareholderEquity: number;
    netTangibleAssets: number;
    id: string;
    _uid: string;
    key: string;
    subkey: string;
    date: number;
    updated: number;
}