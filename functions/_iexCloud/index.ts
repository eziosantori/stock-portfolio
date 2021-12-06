import axios from "axios"
import dotenv from "dotenv";


dotenv.config();
export type IexScope = "quote" | "balance-sheet" | "cash-flow" | "income";
export const iexUrl = process.env.IEXCLODUD_URL;
export const iexTokenKey = "token=" + process.env.IEXCLODUD_TOKEN;
export const getIexData = async (ticker: string, scope: IexScope, additionalQs=""): Promise<any> => {

    try {
    const finalUrl= `${iexUrl}/stock/${ticker}/${scope}?${iexTokenKey}&${additionalQs}`;
    console.log(finalUrl);
    const res = await axios.get(finalUrl);
    return res.data; 
    } catch (error) {
        console.log("iexError",error);
    }

} 