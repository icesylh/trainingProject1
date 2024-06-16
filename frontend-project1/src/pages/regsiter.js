import React, { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { CloseOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'

const Regsiter = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const onFinish = () => {}

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
              Already have and account <Link to="/">Sign in</Link>
            </div>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  )
}
export default Regsiter
