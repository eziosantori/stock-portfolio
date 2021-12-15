import { Button, Input, notification, Table } from 'antd'
import React, { useState } from 'react'
import { getPortfolio } from '../api/portfolio';
import { getQuote } from '../api/stocks/quote';
import { getBalanceSheet } from '../api/stocks/balanceSheet';
import { getFundamentals } from '../api/stocks/fundamentals';
import { useAuth } from '../hooks/useAuth';
import { BasicLayout } from '../layouts';

export const PortfolioPage = () =>{
  const auth = useAuth();
  const [message, setMessage] = useState("MSFT");
  const [data, setData] = useState();
  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'Ticker',
      key: 'Ticker',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'EvalutationType',
      dataIndex: 'EvalutationType',
      key: 'EvalutationType',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
    }
  ];
  const getQuoteClick = async () => {
    try {
      var m = await getQuote(message);
      console.log(m);
      // setMessage(m.message);
      notification.success({
        message: 'Quote recuperata'
      });
    } catch (error) {
      console.log(error);
    }
  }
  const getBS = async () => {
    try {
      var m = await getBalanceSheet(message);
      console.log(m);
      // setMessage(m.message);
      notification.success({
        message: 'Balance sheet recuperato'
      });
    } catch (error) {
      console.log(error);
    }
  }
  const getFnd = async () => {
    try {
      var m = await getFundamentals(message);
      console.log(m);
      // setMessage(m.message);
      notification.success({
        message: 'Fundamentals recuperati'
      });
    } catch (error) {
      console.log(error);
    }
  }
  const getPortfolioClick = async () => {
    try {
      var m = await getPortfolio();
      setData(m as any);
      // setMessage(m.message);
      notification.success({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
      console.log(m);
    } catch (error) {
      console.log(error);
    }
  }
    return (
    <BasicLayout >     
      <div>
        <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <Button type="default" onClick={getQuoteClick}>Quote</Button>
            <Button type="default" onClick={getBS}>Balance</Button>
           <Button type="default" onClick={getFnd}>Fundamentals</Button>
 
      </div>  

       <Button type="default" onClick={getPortfolioClick}>Airt</Button>
       <Button type="default" onClick={()=> auth?.signOut()} >Sign Out</Button>
       <Table key="id" dataSource={data} columns={columns} />
       {message}
    </BasicLayout>
    )
}

