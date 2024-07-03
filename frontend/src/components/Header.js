import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const { Search } = Input
  const history = useHistory()
  const [token] = useState(localStorage.getItem('token'))
  return (
    <div className="header">
      <div className="header-box">
        <div className="left">
          <div className="logo">
            <div className="first pc">Management</div>
            <div className="first mobile">M</div>
            <span>Chuwa</span>
          </div>
          <Search placeholder=" search" allowClear className="pc" />
        </div>
        <div className="right">
          <div
            className="right-item"
            onClick={() => {
              if (token) {
                localStorage.removeItem('token')
                history.push('/')
              } else {
                history.push('/')
              }
            }}
          >
            <UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
            <span className="item-name">{token || 'Sign in'} </span>
          </div>
        </div>
      </div>
      <div className="mobile">
        <Search placeholder=" search" allowClear />
      </div>
    </div>
  )
}
export default Header
