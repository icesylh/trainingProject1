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

const ProductsPage = () => {
  const { userId = '', token = '' } = useParams<{ userId: string; token: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Todo:解决username和token不匹配的问题
  //前端用public key解密
   

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken === token) {
      setLoading(false);
    } else {
      message.error('Invalid token, please log in again.');
      navigate('/');
    }
  }, [token, navigate]);


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const dispatch = useDispatch();
  useEffect(() => {
      if (userId) {
          // @ts-ignore
          dispatch(fetchCart(userId));
      }
  }, [dispatch, userId]);

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
