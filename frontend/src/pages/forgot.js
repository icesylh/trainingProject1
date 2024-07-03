// import React, { useState } from 'react'
// import { Button, Form, Input, message } from 'antd'
// import Footer from '../components/Footer'
// import Header from '../components/Header'
// import { CloseOutlined } from '@ant-design/icons'
// import { useHistory, Link } from 'react-router-dom'
// import axios from 'axios'

// function getUrlParams(url) {
//   const urlParams = new URLSearchParams(url.split('?')[1])
//   const params = {}
//   for (let param of urlParams.entries()) {
//     params[param[0]] = param[1]
//   }
//   return params
// }

// const Update = () => {
//   const [form] = Form.useForm()
//   const history = useHistory()

//   const onFinish = ({ password }) => {
//     const { id, code } = getUrlParams(window.location.search)
//     axios
//       .post('http://localhost:8088/User/forgot', {
//         account: id,
//         password: password,
//         code
//       })
//       .then((res) => {
//         if (res.data.Code === 200) {
//           message.success(res.data.Msg)
//           setTimeout(() => {
//             history.push('/')
//           }, 1000)
//         } else {
//           message.error(res.data.Msg)
//         }
//       })
//   }

//   return (
//     <div className="container">
//       <Header />
//       <div className="main">
//         <Form
//           layout="vertical"
//           form={form}
//           className="login-form"
//           onFinish={onFinish}
//         >
//           <h2 className="title">Update your password</h2>
//           <CloseOutlined className="close" />
//           <p className="msg">Enter your password</p>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input placeholder="input password" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" block htmlType="submit">
//               Update password
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//       <Footer />
//     </div>
//   )
// }
// export default Update







import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom'; // Updated here
import axios from 'axios';

function getUrlParams(url) {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const params = {};
  for (let param of urlParams.entries()) {
    params[param[0]] = param[1];
  }
  return params;
}

const Update = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Updated here

  const onFinish = ({ password }) => {
    const { id, code } = getUrlParams(window.location.search);
    axios.post('http://localhost:8088/User/forgot', {
      account: id,
      password: password,
      code
    })
    .then((res) => {
      if (res.data.Code === 200) {
        message.success(res.data.Msg);
        setTimeout(() => {
          navigate('/'); // Updated here
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
          <h2 className="title">Update your password</h2>
          <CloseOutlined className="close" />
          <p className="msg">Enter your password</p>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="input password" />
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
  );
};

export default Update;
