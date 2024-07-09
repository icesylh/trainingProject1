import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { Search } = Input;
  const navigate = useNavigate();  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('email')); 

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('email'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('email');  
      setIsLoggedIn(false); 
      navigate('/');  
    } else {
      setIsLoggedIn(false); 
    }
  };

  return (
    <div className="header">
      <div className="header-box">
        <div className="left">
          <div className="logo">
            <div className="first pc">Management</div>
            <div className="first mobile">M</div>
            <span>Chuwa</span>
          </div>
          <Search placeholder="search" allowClear className="pc" />
        </div>
        <div className="right">
          <div
            className="right-item"
            onClick={handleLoginLogout}
          >
            <UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
            <span className="item-name">{isLoggedIn ? 'logo out' : 'Sign in'}</span>
          </div>
        </div>
      </div>
      <div className="mobile">
        <Search placeholder="search" allowClear />
      </div>
    </div>
  );
};

export default Header;