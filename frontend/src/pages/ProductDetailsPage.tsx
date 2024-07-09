import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartIcon from "../components/Cart/CartIcon";
import Cart from "../components/Cart/Cart";
import { message } from 'antd';
import axios from 'axios';

const outContainerStyle = {
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pt: '60px',
  pb: '60px',
};

const headerStyle = {
  backgroundColor: '#000',
  color: '#fff',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
};

const ProductDetailsPage = () => {
  const { userId = '', token = '' } = useParams<{ userId: string; token: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const validateTokenAndUserId = async (token: string, userId: string) => {
    try {
      const response = await axios.post('http://localhost:8088/api/validate-token', { token, userId });
      return response.data.isValid;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };


  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken || storedToken !== token) {
        message.error('Invalid token, please log in again.');
        navigate('/');
      } else {
        const isValid = await validateTokenAndUserId(storedToken, userId);
        if (!isValid) {
          message.error('User ID and token do not match, please log in again.');
          navigate('/');
        }
      }
    };

    validateToken();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ''; // Chrome requires returnValue to be set
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [token, userId, navigate]);



  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Box sx={headerStyle}>
        <Header />
        {userId && <CartIcon onClick={toggleCart} userId={userId} />}
      </Box>

      <Box sx={outContainerStyle}>
        <ProductDetails userId={userId} token={token} />
      </Box>
      {isCartOpen && <Cart onClose={toggleCart} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
