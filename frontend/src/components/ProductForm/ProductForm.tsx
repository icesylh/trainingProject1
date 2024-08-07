import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CreateProductForm } from './createProductForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const productFormContainerStyle = (isMobile: boolean) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F9F9F9',
  padding: isMobile ? 2 : 3,
  width: isMobile ? '90%' : 'auto',
});

const headerContainerStyle = (isMobile: boolean) => ({
  width: isMobile ? '100%' : 660,
  display: 'flex',
  flexDirection: 'column',
  alignItems: isMobile ? 'center' : 'flex-start',
  marginBottom: 3,
});

const headerTextStyle = (isMobile: boolean) => ({
  textAlign: isMobile ? 'center' : 'left',
  fontWeight: isMobile ? 'bold' : 'normal',
});

export const ProductForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { userId, token, productId } = useParams<{ userId: string; token?: string; productId?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error('Token is missing');
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <Box sx={productFormContainerStyle(isMobile)}>
      <Box sx={headerContainerStyle(isMobile)}>
        <Typography variant={isMobile ? "h5" : "h3"} sx={headerTextStyle(isMobile)}>
          Create Product
        </Typography>
      </Box>
      <CreateProductForm userId={userId!} token={token} productId={productId} isMobile={isMobile} />
    </Box>
  );
};
