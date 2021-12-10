
import { Handler } from "@netlify/functions";
import { getIexDataStock } from "../_iexCloud";

  const getIncomeStatment: Handler = async (event, context, callback) => {
    const { symbol } = event.queryStringParameters;
    const res = await getIexDataStock(symbol, "income", "period=annual");     
    const retData = {
        ...res
      }
    return {
      statusCode: 200,
      headers: {
         'Content-Type': 'application/json' 
      },
      body: JSON.stringify(retData),
    };
  };
  export default getIncomeStatment;
  
