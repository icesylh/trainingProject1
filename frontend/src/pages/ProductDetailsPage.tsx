import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartIcon from "../components/Cart/CartIcon";
import Cart from "../components/Cart/Cart";
import { message } from 'antd';

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

  useEffect(() => {
    const validateToken = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken || storedToken !== token) {
        message.error('Invalid token, please log in again.');
        navigate('/');
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
  }, [token, navigate]);

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
