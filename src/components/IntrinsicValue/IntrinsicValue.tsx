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
  Divider,
  Row,
  Col
} from 'antd';
import { EvalModel, IntrincValueBaseData, IntrincValueData, IntrincValueDetailData } from './types';
import { FormHeader, FormHeaderDefValues } from './FormHeader';
import { FormDetails } from './FormDetails';

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

export const IntrinsicValue: React.FC<IntrinsicValueProps> = ({
  ticker
}) => {

  const [data, setData] = useState<IntrincValueBaseData>(FormHeaderDefValues);
  const [growthN, setGrowthN] = useState<IntrincValueDetailData>({ weight: 60, growthRate: 5, growthDecline: 2, finalMultiple: 15 });
  const [growthB, setGrowthB] = useState<IntrincValueDetailData>({ weight: 20, growthRate: 10, growthDecline: 1, finalMultiple: 20 });
  const [growthW, setGrowthW] = useState<IntrincValueDetailData>({ weight: 20, growthRate: 2, growthDecline: 2, finalMultiple: 10 });
  useEffect(() => {
    //
    return () => {
      // cleanup
    }
  }, [])
  const onFinish = async () => {
    // console.log('onFinish of form: ', values);
    var v = {...data, ...growthN};
    var v1 = {...data, ...growthB};
    var v2 = {...data, ...growthW};
    var res = calc(v);
    growthN.fairValue=res.presentValueSum;

    var res1 = calc(v1);
    growthB.fairValue=res1.presentValueSum;

    var res2 = calc(v2);
    growthW.fairValue=res2.presentValueSum;
    data.fairValueWeigth = (growthN.fairValue * growthN.weight / 100) +
    (growthB.fairValue * growthB.weight / 100) +
    (growthW.fairValue * growthW.weight / 100);

    console.log(data);
  };
  const onHeaderChange = async (values: IntrincValueBaseData) => {
    setData(values);
    console.log('onHeaderChange of form: ', values);
  };
  const onValuesChange = async (values: IntrincValueDetailData, growthCase: string) => {
 
    switch (growthCase) {
      case "Normal":
        setGrowthN(values);
        break;
      case "Better":
        setGrowthB(values);
        break;
      case "Worst":
        setGrowthW(values);
        break;
    }
    console.log('onValuesChange of form: ', values);
  };
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
      lastGrowth = lastGrowth - (lastGrowth * (calcData.growthDecline/100));
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

      <FormHeader onValuesChange={onHeaderChange} defValues={data} />
      <Divider orientation="left">Growth</Divider>
      <FormDetails growthCase='Normal' defValues={growthN} onValuesChange={onValuesChange} />
      {/* <Divider orientation="left">Better Case</Divider> */}
      <FormDetails growthCase='Better' defValues={growthB} onValuesChange={onValuesChange} />
      {/* <Divider orientation="left">Worst Case</Divider> */}
      <FormDetails growthCase='Worst' defValues={growthW} onValuesChange={onValuesChange} />
      <Button htmlType="button" onClick={onFinish} type='primary' >Calcola</Button>
      <Divider orientation="left">Results:</Divider>
  
    </>
  );
};