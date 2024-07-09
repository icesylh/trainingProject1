// import React, { useState } from 'react';
// import { UserOutlined } from '@ant-design/icons';
// import { Input } from 'antd';
// import { useNavigate } from 'react-router-dom';  

// const Header = () => {
//   const { Search } = Input;
//   const navigate = useNavigate();  
//   const [token, setToken] = useState(localStorage.getItem('email'));

//   return (
//     <div className="header">
//       <div className="header-box">
//         <div className="left">
//           <div className="logo">
//             <div className="first pc">Management</div>
//             <div className="first mobile">M</div>
//             <span>Chuwa</span>
//           </div>
//           <Search placeholder=" search" allowClear className="pc" />
//         </div>
//         <div className="right">
//           <div
//             className="right-item"
//             onClick={() => {
//               if (token) {
//                 localStorage.setItem('email', 'logo out');  // Temporarily set email to 'logo out'
//                 navigate('/');  
//                 localStorage.removeItem('email');  // Clear the email from localStorage after navigation
//                 setToken(null);  // Reset token to null to show 'Sign in'
//               } else {
//                 navigate('/');  
//               }
//             }}
//           >
//             <UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
//             <span className="item-name">{token || 'Sign in'}</span>
//           </div>
//         </div>
//       </div>
//       <div className="mobile">
//         <Search placeholder=" search" allowClear />
//       </div>
//     </div>
//   );
// }

// export default Header;






import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { Search } = Input;
  const navigate = useNavigate();  
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('email'));
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('email');  
      setIsLoggedIn(false); 
      navigate('/');  
    } else {
      localStorage.setItem('email', 'icesylh@yahoo.com');
      setIsLoggedIn(true);  
      navigate('/dashboard');  
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
          <Search placeholder=" search" allowClear className="pc" />
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
        <Search placeholder=" search" allowClear />
      </div>
    </div>
  );
};

export default Header;
