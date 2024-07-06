import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ProductForm } from '../components/ProductForm/ProductForm';
import { useParams, useNavigate } from 'react-router-dom';
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

const CreateProductPage = () => {
  const { token = '' } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken === token) {
      setLoading(false);
    } else {
      message.error('Invalid token, please log in again.');
      navigate('/');
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={outContainerStyle}>
      <ProductForm />
    </Box>
  );
};

export default CreateProductPage;
