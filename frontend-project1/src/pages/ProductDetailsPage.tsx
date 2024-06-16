import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import FakeHeader from '../components/Header/FakeHeader';
import FakeFooter from '../components/Header/FakeFooter';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const outContainerStyle = {
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pt: '60px',  
  pb: '60px', 
};

const ProductDetailsPage = () => {
  const { id, userId } = useParams<{ id: string; userId: string }>();
  const product = useSelector((state: RootState) => state.products.products.find(p => p.id === parseInt(id!)));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <FakeHeader />
      <Box sx={outContainerStyle}>
        <ProductDetails product={product} userId={userId ?? ''} />
      </Box>
      <FakeFooter />
    </>
  );
};

export default ProductDetailsPage;
