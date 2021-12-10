import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  signInWithEmailAndPassword, signInWithGoogle } from "../../../firebase";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

export const LoginNew = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    await signInWithEmailAndPassword(values.username, values.password)
  };

  return (
    <div className="login">
      <div className="login__container">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size={'large'}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
          <Link className="login-form-forgot" to="/reset">Forgot Password</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      
        Or <Link to="/register">Register</Link> now!
      </Form.Item>
      <Form.Item>
                <Button type="primary" htmlType="button" onClick={signInWithGoogle} className="login-form-button">
          Log in with Google
        </Button>  
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};