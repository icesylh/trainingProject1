import { Box } from '@mui/material';
import { ProductCard } from '../components/ProductCard/ProductCard';
import FakeHeader from '../components/Header/FakeHeader';
import FakeFooter from '../components/Header/FakeFooter';
import Cart from '../components/Cart/Cart';
import CartIcon from '../components/Cart/CartIcon';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const { userId } = useParams<{ userId: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Box sx={headerStyle}>
        <FakeHeader />
        {userId && <CartIcon onClick={toggleCart} userId={userId} />}
      </Box>
      <Box sx={outContainerStyle}>
        <ProductCard />
      </Box>
      {isCartOpen && <Cart onClose={toggleCart} />}
      <FakeFooter />
    </>
  );
};

export default ProductsPage;
