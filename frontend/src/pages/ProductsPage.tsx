import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ProductCard } from '../components/ProductCard/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart/Cart';
import CartIcon from '../components/Cart/CartIcon';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../store/productsSlice';
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

const ProductsPage = () => {
  const { userId = '', token = '' } = useParams<{ userId: string; token: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken === token) {
      validateTokenAndUserId(storedToken, userId).then((isValid) => {
        if (!isValid) {
          message.error('User ID and token do not match, please log in again.');
          navigate('/');
        } else {
          setLoading(false);
        }
      });
    } else {
      message.error('Invalid token, please log in again.');
      navigate('/');
    }
  }, [token, userId, navigate]);


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      // @ts-ignore
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={headerStyle}>
        <Header />
        {userId && <CartIcon onClick={toggleCart} userId={userId} />}
      </Box>
      <Box sx={outContainerStyle}>
        <ProductCard userId={userId} token={token} />
      </Box>
      {isCartOpen && <Cart onClose={toggleCart} />}
      <Footer />
    </>
  );
};

export default ProductsPage;
