
import { Handler } from "@netlify/functions";
import { getIexDataStock } from "../_iexCloud";

  const getQuote: Handler = async (event, context, callback) => {
    const { symbol } = event.queryStringParameters;
    // const id= "MSFT";
    // per ora ignoro il caching

    // var dtCheck = moment().format('YYYY-MM-DD');
    // const quotes = db.collection("quotes");
    // const doc = await quotes.doc(id).get();
    // const d: any = doc.data();
    // let retData: any ={};
    
    // if(doc.exists && d.datetime === dtCheck){
    //   // get 
    //   retData = {
    //     id: doc.id, 
    //     ...doc.data()
    //   };
    // }else{
    //   const res = await getIexData(id);
    //   await quotes.doc(id).set(res);

    //   retData = {
    //     new: true,
    //     _id: id,
    //     ...res
    //   }
    // }

    const res = await getIexDataStock(symbol, "quote", "period=annual");     
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

  export default getQuote;
  
