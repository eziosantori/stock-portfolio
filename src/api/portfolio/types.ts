
export interface PortfolioItem {
    ticker: string;
    price: number;
    fairValue: number;
    marginOfSaefty?: number;
    description: string;
    type: string;
    sector: string;
    tags: any;
    story?: string;
    strategy?: string;
    risks?: string;
  }