import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  notification,
  Row,
  Select,
  Spin,
  Switch,
} from 'antd';
import { EvalModelValues, IntrincValueData } from './types';
import { getIntrinsicValueData, saveIntrinsicValueData } from '../../api/portfolio';

export interface IntrinsicValueProps {
  ticker: string;
}

export type CalcResult = {
  growthRate: number[];
  growthData: number[];
  growthDataPv: number[];
  terminalValue: number;
  terminalValueDiscounted: number;
  presentValueSum: number;
}
export const defFormValues: IntrincValueData = {
  model: EvalModelValues[2].value,
  compound: false,
  shares: null,
  years: 10,
  value: 0.5,
  discountRate: 10,
  finalMultiple: 15,
  growthDecline: 0,
  growthRate: 10,
  weight: 100
}
const colsSize = [4,6,8,6];
export const IntrinsicValue2: React.FC<IntrinsicValueProps> = ({
  ticker
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IntrincValueData>();
 
  useEffect(() => {
    loadValues();
    return () => {
      // cleanup
    }
  }, [ticker])
  
  const loadValues = () => {
    getIntrinsicValueData(ticker)
      .then((res) => {
        console.log(res);
        // se nn ci sono dati
        if (!res)
          form.setFieldsValue(defFormValues);
        else {
          // todo
          form.setFieldsValue(res);
        }
      })
      .catch((err) => {
        notification.error({message: "Error loading data"});
        console.log(err);
      }).finally(() => setLoading(false));
  }
  const saveValues = async () => {
    try{
      await saveIntrinsicValueData(ticker, data);
      notification.success({message: "Data Saved"});

    }
    catch(e){
      notification.error({message: "Error saving data"});

    }
  }
  const onFinish = async (values: IntrincValueData) => {
    // console.log('onFinish of form: ', values);
    // var data = { ...values };
    const res = calc(values);
    const model = EvalModelValues.find(m => m.value === values.model);
    let divisore = 1;
    if(model?.marketCap){
      if(!values.shares){
        notification.error({message: "Number of shares required"});
        return;
      }
      divisore = values.shares;
    }
    const price = Math.round(((res.presentValueSum / divisore) + Number.EPSILON) * 100) / 100
    values.fairValue = price;
    values.fairValueWeigth =  price;
    form.setFieldsValue(values);
    setData(values);

    console.log(values);
  };
  const onFormChange = (value: any, values: IntrincValueData) => {
    setData(undefined);
    // todo cambiare alcune label in base al calcolo per perShare o Milions

  }

  const presentValue = (value: number, years: number, discountRate: number) => {
    return value * Math.pow((1 + discountRate / 100), (years) * -1);
  }

  const calc = (calcData: IntrincValueData): CalcResult => {
    const data: number[] = [];
    const growthRate: number[] = [];
    const dataCompound: number[] = [];
    let lastValue: number = (calcData.value as number);
    let lastGrowth: number = calcData.growthRate;
    // let terminalValue: number = 0;
    for (let y = 0; y < calcData.years; y++) {
      lastValue = lastValue * (1 + lastGrowth / 100);
      data[y] = lastValue;
      growthRate[y] = lastGrowth;
      // dataCompound[y] = (lastValue * (1+ calcData.discountRate/100));
      if (calcData.compound) {
        dataCompound[y] = presentValue(lastValue, y + 1, calcData.discountRate);
        //terminalValue += lastValue;
      }
      lastGrowth = lastGrowth - (lastGrowth * (calcData.growthDecline / 100));
    }
    const terminalValue = data[calcData.years - 1] * calcData.finalMultiple;
    const terminalValueDiscounted = presentValue(terminalValue, calcData.years, calcData.discountRate);
    const presentValueSum = terminalValueDiscounted + (dataCompound.length > 0 ? dataCompound.reduce((p, c) => p + c) : 0);
    // console.log(data, terminalValue, dataCompound, terminalValueDiscounted, presentValueSum);
    // setCalcValue(presentValueSum);
    return {
      growthData: data,
      growthRate,
      growthDataPv: dataCompound,
      terminalValue,
      terminalValueDiscounted,
      presentValueSum
    }
  }

  return (
    <>
      {/* */}
      <Spin tip="Loading..." size="large" spinning={loading}>  
      {ticker}
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onFormChange}
        // onValuesChange={onValuesChangeRaise}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 20 }}
        layout="vertical"
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        size={'middle'}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label={"Model"} name="model" rules={[{ required: true, message: 'Select the model!' }]} >
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
          <Col span={8}>
            <Form.Item label={"Shares Outstanging"} name="shares" tooltip="Shares Outstanging">
              <InputNumber
                placeholder="Shares out"
                addonAfter="Mil"
                step="0.001"
              // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={value => (value?.replace(/\$\s?|(,*)/g, '') as any)}
              />
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
                addonAfter="%"

              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Add Compound" name="compound">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">Growth</Divider>
        {labelsRow()}
        {growthRow()}
        {growthDeclineRow()}
        {finalMultipleRow()}
        {weightRow()}
        {calcsRow()}
        <Row>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Calcola
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button 
              onClick={saveValues}
              disabled={(data===undefined)} 
              type="primary" htmlType="button" className="login-form-button">
                Salva
              </Button>
            </Form.Item>
          </Col>          
        </Row>
      </Form>

      </Spin> 


    </>
  );
};
const calcsRow = (): JSX.Element => {
  return (
    <Row gutter={24}>
      <Col span={colsSize[0]}>
      <Form.Item label=""  name="fairValueWeigth" tooltip="Testo di aiuto per capire cosa mettere">
              <InputNumber
                readOnly={true}
                placeholder="Value in Milions"
                addonAfter="$"
                step="0.05"
              />
            </Form.Item>
      </Col>
      <Col span={colsSize[1]}>
        Low
      </Col>
      <Col span={colsSize[2]}>
      <Form.Item label="" name="fairValue" tooltip="Testo di aiuto per capire cosa mettere">
              <InputNumber
                readOnly={true}
                placeholder="Value in Milions"
                addonAfter="$"
                step="0.05"
              // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={value => (value?.replace(/\$\s?|(,*)/g, '') as any)}
              />
            </Form.Item>
      </Col>
      <Col span={colsSize[3]}>
        Best
      </Col>
    </Row>
  )
};
const labelsRow = (): JSX.Element => {
  return (
    <Row gutter={24}>
      <Col span={colsSize[0]}>

      </Col>
      <Col span={colsSize[1]}>
        Low
      </Col>
      <Col span={colsSize[2]}>
        Normal
      </Col>
      <Col span={colsSize[3]}>
        Best
      </Col>
    </Row>
  )
};
const growthRow = (): JSX.Element => {
  return (
    <Row gutter={24}>
      <Col span={colsSize[0]}>
        Growth
      </Col>
      <Col span={colsSize[1]}>
        Low
      </Col>
      <Col span={colsSize[2]}>
        <Form.Item label="" name="growthRate" >
          <InputNumber
            min={0}
            max={100}
            addonAfter="%"
          />
        </Form.Item>
      </Col>
      <Col span={colsSize[3]}>
        Best
      </Col>
    </Row>
  )
};
const growthDeclineRow = (): JSX.Element => {
  return (
    <Row gutter={24}>
      <Col span={colsSize[0]}>
        Growth Decline
      </Col>
      <Col span={colsSize[1]}>
        Low
      </Col>
      <Col span={colsSize[2]}>
        <Form.Item label="" name="growthDecline" >
          <InputNumber
            min={0}
            max={100}
            addonAfter="%"
          />
        </Form.Item>
      </Col>
      <Col span={colsSize[3]}>
        Best
      </Col>
    </Row>
  )
};
const finalMultipleRow = (): JSX.Element => {
  return (
    <Row gutter={24}>
      <Col span={colsSize[0]}>
        Final Multiple
      </Col>
      <Col span={colsSize[1]}>
        Low
      </Col>
      <Col span={colsSize[2]}>
        <Form.Item label="" name="finalMultiple">
          <InputNumber
            min={0}
            max={100}
            addonAfter="PE"
          />
        </Form.Item>
      </Col>
      <Col span={colsSize[3]}>
        Best
      </Col>
    </Row>
  )
};
const weightRow = (): JSX.Element => {
  return (
    <Row gutter={24}>
      <Col span={colsSize[0]}>
        Wheight
      </Col>
      <Col span={colsSize[1]}>
        Low
      </Col>
      <Col span={colsSize[2]}>
        <Form.Item label="" name="weight" >
          <InputNumber
            min={0}
            max={100}
            addonAfter="%"
          />
        </Form.Item>
      </Col>
      <Col span={colsSize[3]}>
        Best
      </Col>
    </Row>
  )
}; 