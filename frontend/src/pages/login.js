import React from 'react';
import { Button, Form, Input, message } from 'antd';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../store/userSlice';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = ({ email, password }) => {
    axios.post('http://localhost:8088/Login', {
      account: email,
      password: password
    })
    .then((res) => {
      if (res.data.Code === 200) {
        message.success(res.data.Msg);
        localStorage.setItem('token', res.data.Token);
        localStorage.setItem('email', email);

        const isAdmin = res.data.data.type === '1'; 
        console.log('User type:', res.data.data.type);
        console.log('Is admin:', isAdmin);
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false'); 
        dispatch(setAdmin(isAdmin));

        setTimeout(() => {
          navigate(`/user/${res.data.data.name}/${res.data.Token}/products`);
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
          <CloseOutlined className="close" />
          <h2 className="title">Sign in to your account</h2>
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
            <Input type="password" placeholder="input Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <div className="link">
            <div>
              Dont have an account? <Link to="/register">Sign up</Link>
            </div>
            <Link to="/update">Forgot password</Link>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
