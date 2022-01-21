import { Button, Input, Modal, notification, Table } from 'antd'
import { PageHeader, Tabs, Statistic, Descriptions } from 'antd';
import React, { useState } from 'react'
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

  const closeModal = () => {
    setShowNewItem(false);
    setEditItem(undefined);
  }
    return (
      <>
    <BasicLayout >
      <PageHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title="Portfolio"
        subTitle="This is a subtitle"
        extra={[
          <Button type="primary" onClick={()=> setShowNewItem(true)}>+ New</Button>,
          <Button type="default" onClick={()=> auth?.signOut()} >Sign Out</Button>,
        ]}
      >
       {showNewItem || editItem ?
        null
        : <Dashboard onTickerClick={(item) => setEditItem(item)} />
        }
      </PageHeader> 
      
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

