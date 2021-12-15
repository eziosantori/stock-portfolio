import { BasicLayout } from '../layouts';
import {IntrinsicValue, IntrinsicValue2 } from '../components/IntrinsicValue';
import { useParams } from 'react-router-dom';

export const IntrinsicValuePage = () =>{
    let { ticker } = useParams();
    return (
    <BasicLayout >
        {ticker
        ? <IntrinsicValue2 ticker={ticker} />
        : <div>No ticker found</div>
        }
    </BasicLayout>
    )
}

