import { Form, Input, Button, Select, InputNumber, notification } from 'antd';
import { useEffect } from 'react';
import { savePortfolioRecord } from '../../api/portfolio';
import { PortfolioItem } from '../../api/portfolio/types';
import { getIexDataStock } from '../../api/stocks/iexcloud';
import { defaultTags, Sectors, StockTypes } from '../../store/shared.types';
export interface PortfolioEditProps {
  item?: PortfolioItem;
  onSaveDone(): void;
}

export const PortfolioEdit: React.FC<PortfolioEditProps> = ({
  item,
  onSaveDone
}) => {
  const [form] = Form.useForm();
  const initValues = { sector: Sectors[0].value, fairValue: 50  };
  useEffect(() => {
    form.setFieldsValue(item);
    return () => {
      // cleanup
    }
  }, [item])

  const onFinish = async (values: PortfolioItem) => {
    await savePortfolioRecord(values.ticker, values);
    onSaveDone();
    form.resetFields();
    notification.success({message: "Portfolio item saved"})
    // console.log('Success:', values);
  };
  const onValuesChange = (changedValue: any, values: PortfolioItem) => {
    // console.log(changedValue);
    if(changedValue.price && values.fairValue){
      const perc = (values.fairValue - changedValue.price) / values.fairValue;
      const res = Math.round((perc + Number.EPSILON) * 100) ;
      form.setFieldsValue({marginOfSaefty: res})
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onSearch = async (value:string) => {
    const res = await getIexDataStock(value, "company");
    console.log(res);
  }
  return (
    <Form
      form={form}
      size='middle'
      name="Portfolio"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout='horizontal'
      initialValues={initValues}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Ticker"
        name="ticker"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input.Search
          placeholder="input search text"
          enterButton="Search"
          // suffix={suffix}
          onSearch={onSearch}
    />
      </Form.Item>
      <Form.Item label="Price Action" style={{ marginBottom: 0 }}>
      <Form.Item
          name="price"
          label="Last price"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(35% - 8px)' }}
        >
          <InputNumber placeholder="last price" addonAfter="$" />
        </Form.Item>
        <Form.Item
          name="fairValue"
          label="Fair Value"
          style={{ display: 'inline-block', width: 'calc(35% - 8px)', margin: '0 0 0 8px' }}
        >
          <InputNumber disabled placeholder="fair price calc." addonAfter="$" />
        </Form.Item>
        <Form.Item
          name="marginOfSaefty"
          label="Margin %"
          tooltip="Margin of saefty fairprice/price"
          style={{ display: 'inline-block', width: 'calc(30%)', margin: '0 0 0 8px' }}
        >
          <InputNumber disabled placeholder="margin of saefty" addonAfter="%" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Sector"
        name="sector"
      >
        <Select>
            {Sectors.map(m => <Select.Option key={m.value} value={m.value}>{m.label}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
      >
        <Select>
            {StockTypes.map(m => <Select.Option key={m.value} value={m.value}>{m.label}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item name={"tags"} label="Tags">
      <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" >
            {defaultTags.map(m => <Select.Option key={m.value} value={m.value}>{m.value}</Select.Option>)}
      </Select>
      </Form.Item>    
      <Form.Item
        label="Story"
        name="story"
      >
        <Input.TextArea placeholder='The story behind the possible investment'/>
      </Form.Item>      
      <Form.Item
        label="Strategy"
        name="strategy"
        help="The strategy to pursuit, enter exit etc.."
      >
        <Input.TextArea placeholder='The strategy'/>
      </Form.Item>
      <Form.Item
        label="Possible Risks"
        name="risks"
      >
        <Input.TextArea placeholder='Indicate possible risks' />
      </Form.Item>       
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};