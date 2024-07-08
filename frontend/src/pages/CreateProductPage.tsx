import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ProductForm } from '../components/ProductForm/ProductForm';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
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

const CreateProductPage = () => {
  const { userId = '', token = '' } = useParams<{ userId: string; token: string }>();
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
