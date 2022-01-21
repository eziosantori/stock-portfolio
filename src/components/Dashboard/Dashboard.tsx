import { Button, notification, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getPortfolio } from '../../api/portfolio';
import { PortfolioItem } from '../../api/portfolio/types';
const { Text } = Typography;
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
  }, []);
  const calcMargin = (record: PortfolioItem) => {
    const num = (record.fairValue - record.price) / record.fairValue;
    const numFinal = Number(num * 100).toFixed(2);
    if(num >= 0) return <Text type="success">{numFinal} %</Text>
    if(num >= 0) return <Text type="warning">{numFinal} %</Text>
    if(num < 0) return <Text type="danger">{numFinal} %</Text>
    return <Text>{numFinal} %</Text>
  }
  const columns: ColumnsType<PortfolioItem> = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
      fixed: 'left',
      width: 80,
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
      title: 'Margin',
      dataIndex: 'margin',
      key: 'margin',
      width: 100,
      render: (text: string, record: PortfolioItem) =>  calcMargin(record) 
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
      setData(undefined);
      var m = await getPortfolio();
      setData(m as any);
    } catch (error) {
      console.log(error);
    }
  }
    return (
    <>
       <Button type="default" onClick={getPortfolioClick}>Reload</Button>
       <Table key="id" pagination={false} dataSource={data} columns={columns} scroll={{ x: 1500 }} />;
       {message}
    </>
    )
}


