import { Button, Input, Modal, notification, Table } from 'antd'
import React, { useState } from 'react'
import { getPortfolio } from '../api/portfolio';
import { getQuote } from '../api/stocks/quote';
import { getBalanceSheet } from '../api/stocks/balanceSheet';
import { getFundamentals } from '../api/stocks/fundamentals';
import { useAuth } from '../hooks/useAuth';
import { BasicLayout } from '../layouts';
import {PortfolioEdit } from '../components/Portfolio'
import Dashboard from '../components/Dashboard';
import { PortfolioItem } from '../api/portfolio/types';

export const PortfolioPage = () =>{
  const auth = useAuth();
  const [showNewItem, setShowNewItem] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem>();
  const [message, setMessage] = useState("MSFT");

  const closeModal = () => {
    setShowNewItem(false);
    setEditItem(undefined);
  }
    return (
      <>
    <BasicLayout >     
            <Button type="primary" onClick={()=> setShowNewItem(true)}>+ New</Button>

      {/* <div>
        <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <Button type="default" onClick={getQuoteClick}>Quote</Button>
            <Button type="default" onClick={getBS}>Balance</Button>
           <Button type="default" onClick={getFnd}>Fundamentals</Button>
 
      </div>  

       <Button type="default" onClick={getPortfolioClick}>Airt</Button> */}
       <Button type="default" onClick={()=> auth?.signOut()} >Sign Out</Button>
       {showNewItem || editItem ?
        null
        : <Dashboard onTickerClick={(item) => setEditItem(item)} />
        }
       
      
    </BasicLayout>
    <Modal
        className='full-ant-modal'
        title="New Record"
        visible={showNewItem}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={closeModal}
        footer={null}
      >
        <div style={{maxWidth: '650px', margin: "auto"}}>
        <PortfolioEdit onSaveDone={closeModal}  /> 
        </div>
      </Modal>
      <Modal
        className='full-ant-modal'
        title={`Modifica ${editItem?.ticker}`}
        visible={(editItem!=undefined)}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={closeModal}
        footer={null}
      >
        <div style={{maxWidth: '650px', margin: "auto"}}>
        <PortfolioEdit  item={editItem} onSaveDone={closeModal}  /> 
        </div>
      </Modal>      
    </>
    )
}

