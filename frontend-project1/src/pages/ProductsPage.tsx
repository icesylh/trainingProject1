import { Box } from '@mui/material';
import {ProductCard} from '../components/ProductCard/ProductCard';
import FakeHeader from '../components/Header/FakeHeader';
import FakeFooter from '../components/Header/FakeFooter';

const outContainerStyle = {
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pt: '60px',  
  pb: '60px', 
};

const ProductsPage = () => {
  return (
    <>
      <FakeHeader />
      <Box sx={outContainerStyle}>
        <ProductCard />
      </Box>
      <FakeFooter />
    </>
  );
};

export default ProductsPage;
