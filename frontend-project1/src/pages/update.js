import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { CloseOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const onFinish = ({ email }) => {
    axios
      .post('http://localhost:8088/Forgot', {
        account: email
      })
      .then((res) => {
        if (res.data.Code === 200) {
          message.success(res.data.Msg)
          setTimeout(() => {
            history.push('/end')
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
          <h2 className="title">Update your password</h2>
          <CloseOutlined className="close" />
          <p className="msg">
            Enter your email link, we will send you the recovery link
          </p>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="input Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Update password
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  )
}
export default Update
