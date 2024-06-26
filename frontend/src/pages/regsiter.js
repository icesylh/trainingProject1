import React from 'react';
import { Button, Form, Input, message } from 'antd';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = ({ password, email }) => {
    axios
      .post('http://localhost:8088/User/Register', {
        account: email,
        password: password,
      })
      .then((res) => {
        if (res.data.Code === 200) {
          message.success(res.data.Msg);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          message.error(res.data.Msg);
        }
      });
  };

  return (
    <div className="container">
      <Header />
      <div className="main">
        <Form
          layout="vertical"
          form={form}
          className="login-form"
          onFinish={onFinish}
        >
          <h2 className="title">Sign up an account</h2>
          <CloseOutlined className="close" />
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="input Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="input Password" type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Create account
            </Button>
          </Form.Item>
          <div className="link">
            <div>
              Already have an account? <Link to="/">Sign in</Link>
            </div>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
