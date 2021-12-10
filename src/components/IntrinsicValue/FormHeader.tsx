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
import { EvalModelValues, IntrincValueBaseData } from './types';

export interface FormHeaderProps {
  defValues?: IntrincValueBaseData;
  onValuesChange(data: IntrincValueBaseData): void;
}

export const FormHeaderDefValues: IntrincValueBaseData = {
  model: EvalModelValues[2].value,
  compound: false,
  years: 10,
  value: 0.5,
  discountRate: 10
}
export const FormHeader: React.FC<FormHeaderProps> = ({
  defValues = FormHeaderDefValues,
  onValuesChange,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defValues);
    return () => {
      // cleanup
    }
  }, [defValues])
  const onValuesChangeRaise = async (changedValue: any, values: IntrincValueBaseData) => {
    // console.log('onValuesChange of form: ', values);
    onValuesChange(values);
  };
  return (
    <>
      <Form
        form={form}
        onValuesChange={onValuesChangeRaise}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 20 }}
        layout="vertical"
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        size={'middle'}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item label={"Model"} name="model" >
              <Select  >
                {EvalModelValues.map(m => <Select.Option key={m.value} value={m.value}>{m.label}</Select.Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Years" name="years">
              <Select>
                <Select.Option value="5">5 Years</Select.Option>
                <Select.Option value="10">10 Years</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={24}>          
          <Col span={8}>
            <Form.Item label={"Value"} name="value" tooltip="Testo di aiuto per capire cosa mettere">
              <InputNumber
                placeholder="Value in Bilions"
                addonAfter="$"
              // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={value => (value?.replace(/\$\s?|(,*)/g, '') as any)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Discount Rate" name="discountRate" >
              <InputNumber
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => (value?.replace('%', '') as any)}

              />
            </Form.Item>
          </Col>
          <Col span={8}>

            <Form.Item label="Add Compound" name="compound">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>



    </>
  );
};