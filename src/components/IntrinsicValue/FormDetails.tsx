import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Row,
  Col,
} from 'antd';
import { EvalModelValues, IntrincValueDetailData} from './types';

export interface FormDetailsProps {
    growthCase: string;
    defValues?:IntrincValueDetailData;
    onValuesChange(data: IntrincValueDetailData, growthCase:string):void;
}

const _defValues: IntrincValueDetailData = {
  weight: 10,
  finalMultiple: 15,
  growthRate: 5,
  growthDecline: 1,
} 
export const FormDetails: React.FC<FormDetailsProps> = ({
  growthCase,
  onValuesChange,
  defValues= _defValues,
}) => {
  const [form] = Form.useForm(); 
  useEffect(() => {
    form.setFieldsValue(defValues);
    return () => {
      // cleanup
    }
  }, [])
  const onValuesChangeRaise = async (changedValue: any, values: IntrincValueDetailData) => {
    // console.log('onValuesChange of form: ', values);
    onValuesChange(values, growthCase);
  };
  return (
    <>
    <Form
      form= {form}
      // labelCol={{ span: 12 }}
      // wrapperCol={{ span: 12 }}
      // layout="inline"
      onValuesChange={onValuesChangeRaise}
      size={'middle'}

    >   
    <Row gutter={24}>
      <Col span={2}>
        <strong>{growthCase}</strong>
      </Col>
      <Col span={5}>
      <Form.Item label="Growth Rate" name="growthRate" >
          <InputNumber
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => (value?.replace('%', '') as any)} 
          />
      </Form.Item>      
      </Col>
      <Col span={5}>
      <Form.Item label="Gr. Decline" name="growthDecline" >
          <InputNumber
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => (value?.replace('%', '') as any)} 
          />
      </Form.Item>      
      </Col>
      <Col span={5}>

      <Form.Item label="Final Multiple" name="finalMultiple">
          <InputNumber
          min={0}
          max={100}         
          />
      </Form.Item>   
          </Col>
      <Col span={5}>

      <Form.Item label="Weight" name="weight" >
          <InputNumber
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => (value?.replace('%', '') as any)}
          
        />
        </Form.Item>
      </Col>
      </Row>              
    </Form>
    </>
  );
};