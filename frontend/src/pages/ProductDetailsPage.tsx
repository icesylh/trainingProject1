import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import FakeHeader from '../components/Header/FakeHeader';
import FakeFooter from '../components/Header/FakeFooter';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Cart from '../components/Cart/Cart';
import CartIcon from '../components/Cart/CartIcon';
import { useState } from 'react';

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
  const { id, userId } = useParams<{ id: string; userId: string }>();
  const product = useSelector((state: RootState) => state.products.products.find(p => p.id === parseInt(id!)));
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Box sx={headerStyle}>
        <FakeHeader />
        {userId && <CartIcon onClick={toggleCart} userId={userId} />}
      </Box>
      <Box sx={outContainerStyle}>
        <ProductDetails product={{ ...product, imageUrl: product.imageUrl ?? '' }} userId={userId ?? ''} />
      </Box>
      {isCartOpen && <Cart onClose={toggleCart} />}
      <FakeFooter />
    </>
  );
};

export default ProductDetailsPage;
