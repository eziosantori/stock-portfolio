
export interface CachFlow {
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

export interface CachFlow {
    synmbol: string;
    cashFlow: CashFlowItem[];
}
export interface IncomeItem {
    reportDate: string;
    filingType: string;
    fiscalDate: string;
    fiscalQuarter: number;
    fiscalYear: number;
    currency: string;
    totalRevenue: number;
    costOfRevenue: number;
    grossProfit: number;
    researchAndDevelopment: number;
    sellingGeneralAndAdmin: number;
    operatingExpense: number;
    operatingIncome: number;
    otherIncomeExpenseNet: number;
    ebit: number;
    interestIncome: number;
    pretaxIncome: number;
    incomeTax: number;
    minorityInterest: number;
    netIncome: number;
    netIncomeBasic: number;
  }
  

