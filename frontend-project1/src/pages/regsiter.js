import React, { useState } from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { CloseOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
const { Option } = Select
const Regsiter = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const onFinish = ({ password, email, type }) => {
    axios
      .post('http://localhost:8088/User/Register', {
        account: email,
        password: password,
        type
      })
      .then((res) => {
        if (res.data.Code === 200) {
          message.success(res.data.Msg)
          setTimeout(() => {
            history.push('/')
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
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please Select your type!' }]}
          >
            <Select placeholder="Select type">
              <Option value="1">admin</Option>
              <Option value="2">user</Option>
            </Select>
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
