import { Button, notification, Table } from 'antd'
import React, { useState } from 'react'
import { getPortfolio } from '../../api/portfolio';

export const Dashboard = () =>{
    const [message, setMessage] = useState();
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
    <>
       <Button type="default" onClick={getPortfolioClick}>Airt</Button>
       <Table key="id" dataSource={data} columns={columns} />;
       {message}
    </>
    )
}


