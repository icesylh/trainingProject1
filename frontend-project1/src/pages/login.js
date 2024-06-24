import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { CloseOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const onFinish = ({ email, password }) => {
    axios
      .post('http://localhost:8088/Login', {
        account: email,
        password: password
      })
      .then((res) => {
        if (res.data.Code === 200) {
          message.success(res.data.Msg)
          setTimeout(() => {
            history.push(`/user/${email}/products`)
          }, 1000)
        } else {
          message.error(res.data.Msg)
        }
      })
  }
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
              Dont have an account? <Link to="/regsiter">Sign up</Link>
            </div>
            <Link to="/update">Forgot password</Link>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  )
}
export default Login
