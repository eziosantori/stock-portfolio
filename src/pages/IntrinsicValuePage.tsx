import { BasicLayout } from '../layouts';
import {IntrinsicValue, IntrinsicValue2 } from '../components/IntrinsicValue';
import { useParams } from 'react-router-dom';
import { PageHeader } from 'antd';

export const IntrinsicValuePage = () =>{
    let { ticker } = useParams();
    return (
    <BasicLayout >
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={`Intrinsic value ${ticker}`}
        subTitle="Calculate the intrinsic value of ticker"
        // extra={[
        //   <Button type="primary" onClick={()=> setShowNewItem(true)}>+ New</Button>,
        //   <Button type="default" onClick={()=> auth?.signOut()} >Sign Out</Button>,
        // ]}
      >
               {ticker
        ? <IntrinsicValue2 ticker={ticker} />
        : <div>No ticker found</div>
        }
      </PageHeader> 

    </BasicLayout>
    )
}

