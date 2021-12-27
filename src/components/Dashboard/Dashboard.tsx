import { Button, notification, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getPortfolio } from '../../api/portfolio';
import { PortfolioItem } from '../../api/portfolio/types';

export interface DashboardProps {
  onTickerClick(item: PortfolioItem): void;
}
export const Dashboard: React.FC<DashboardProps> = ({onTickerClick}) =>{
  
  const [message, setMessage] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    getPortfolioClick();
    return () => {
      // cleanup
    }
  }, [])
  const columns: ColumnsType<PortfolioItem> = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
      fixed: 'left',
      width: 100,
      render: (text: string, record: PortfolioItem) => 
        <Button type="link" onClick={()=> onTickerClick(record)}>{text}</Button>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'Price',
      width: 100,
    },
    {
      title: 'Instrinsic Value',
      dataIndex: 'fairValue',
      key: 'fairValue',
      width: 100,
      render: (text: string, record: PortfolioItem) => 
      <Link to={`/intrinsic/${record.ticker}`}>{text}</Link>
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'Sector',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'Type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
       <Button type="default" onClick={getPortfolioClick}>Reload</Button>
       <Table key="id" dataSource={data} columns={columns} scroll={{ x: 1500 }} />;
       {message}
    </>
    )
}


