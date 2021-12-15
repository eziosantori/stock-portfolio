export const getBalanceSheet = async (symbol: string): Promise<CashFlow> => {
    const res = await fetch(`/api/cash-flow?symbol=${symbol}`);
    return await res.json();
}
export interface CashFlow {
    synmbol: string;
    cashFlow: CashFlowItem[];
}
export interface CashFlowItem {
    capitalExpenditures: number;
    cashChange?: number;
    cashFlow: number;
    cashFlowFinancing: number;
    changesInInventories?: number;
    changesInReceivables?: number;
    currency: string;
    depreciation: number;
    dividendsPaid?: number;
    exchangeRateEffect?: number;
    filingType: string;
    fiscalDate: string;
    fiscalQuarter: number;
    fiscalYear: number;
    investingActivityOther?: number;
    investments?: number;
    netBorrowings?: number;
    netIncome: number;
    otherFinancingCashFlows?: number;
    reportDate: string;
    symbol: string;
    totalInvestingCashFlows: number;
    id: string;
    key: string;
    subkey: string;
    date: number;
    updated: number;
}

  

