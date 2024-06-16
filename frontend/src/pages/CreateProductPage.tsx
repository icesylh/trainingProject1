import { Box } from '@mui/material';
import { ProductForm }  from '../components/ProductForm/ProductForm';

const outContainerStyle = {
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pt: '60px',  
  pb: '60px', 
};

const CreateProductPage = () => {
  return (
    <Box sx={outContainerStyle}>
      <ProductForm />
    </Box>
  );
};

export default CreateProductPage;
