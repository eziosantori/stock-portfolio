
import { Handler } from "@netlify/functions";
import { getIexDataTimeSeries } from "../_iexCloud";

  const getFundamentals: Handler = async (event, context, callback) => {
    const { symbol } = event.queryStringParameters;
    const res = await getIexDataTimeSeries(symbol, "fundamentals", "annual", "last=5");     
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
  export default getFundamentals;
  
