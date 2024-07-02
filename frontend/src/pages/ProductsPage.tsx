import { Box } from '@mui/material';
import { ProductCard } from '../components/ProductCard/ProductCard';
import Header from '../components/Header'; // Ensure this imports the correct Header component you want to use
import Footer from '../components/Footer'; // Ensure this imports the correct Footer component you provided
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

    // TODO: Fix header
  return (
      <>
        <Box sx={headerStyle}>
          <Header />
          {userId && <CartIcon onClick={toggleCart} userId={userId} />}
        </Box>
        <Box sx={outContainerStyle}>
          <ProductCard />
        </Box>
        {isCartOpen && <Cart onClose={toggleCart} />}
        <Footer />
      </>
  );
};

export default ProductsPage;
