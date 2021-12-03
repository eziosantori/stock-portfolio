import axios from "axios"
import { db } from "../_firestore/firestore"
import { Handler } from "@netlify/functions";
import moment from "moment";


  const getQuote: Handler = async (event, context, callback) => {
    const id= "AMZN";
    var dtCheck = moment().format('YYYY-MM-DD');
    const quotes = db.collection("quotes");
    const doc = await quotes.doc(id).get();
    const d: any = doc.data();
    let retData: any ={};
    console.log(dtCheck, d.datetime);
    if(doc.exists && d.datetime === dtCheck){
      // get 
      retData = {
        id: doc.id, 
        ...doc.data()
      };
    }else{
      // get and save data
      const options: any = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/quote',
        params: {symbol: id, interval: '1day', outputsize: '30', format: 'json'},
        headers: {
          'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
          'x-rapidapi-key': '8dffb3a21emsh3b76e786aa6edf3p1e90c1jsn61ebbf96bff9'
        }
      };
      const res = await axios.request(options);
      var newDoc = await quotes.doc(id).set(res.data);
      
      retData = {
        new: true,
        id,
        ...res.data
      }
    }


    return {
      statusCode: 200,
      headers: {
        headers: { 'Content-Type': 'application/json' }
      },
      body: JSON.stringify(retData),
    };
  };

  export default getQuote;
  
