
import { Handler } from "@netlify/functions";
import { getIexData } from "../_iexCloud";

  const getCashFlow: Handler = async (event, context, callback) => {
    const { symbol } = event.queryStringParameters;
    const res = await getIexData(symbol, "cash-flow", "period=annual");     
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
  export default getCashFlow;
  
