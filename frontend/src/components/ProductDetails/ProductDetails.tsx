import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CustomButton } from '../Button/CustomButton';
import { StockTag } from './StockTag';
import { addToCart } from '../../store/productsSlice';
import { useNavigate } from 'react-router-dom';

interface ProductDetailsProps {
  product: {
    id: number;
    imageUrl: string;
    name: string;
    category: string;
    price: number;
    description: string;
    inStock: boolean;
  };
  userId: string;
}
const detailOuterContainerBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  maxWidth: '1323px',
  boxSizing: 'border-box' as const,
  alignItems: 'center',
  justifyContent: 'center'
};

const typoStyle = (isMobile: boolean) => ({
  fontWeight: 'bold',
  textAlign: 'left',
  alignSelf: isMobile ? 'center' : 'flex-start'
});

const imageStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
};

const categoryStyle = {
  mb: 1,
  textAlign: 'left',
};

const productStyle = (isMobile: boolean) => ({
  fontWeight: 'bold',
  mb: 2,
  textAlign: 'left',
  color: '#535353',
  fontSize: isMobile ? '1.5rem' : '2.125rem',
});

const priceStyle = (isMobile: boolean) => ({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  fontSize: isMobile ? '1.5rem' : '2rem',
});

const descriptionStyle = {
  my: 3,
  textAlign: 'left',
  lineHeight: '22px',
  color: '#6B7280',
};

const editButtonStyle = {
  height: 'auto',
  width: '133px',
  textTransform: 'none' as const,
  borderColor: '#ccc',
  color: 'black',
};

const detailInnerContainerBox = (isMobile: boolean) => ({
  width: '100%',
  maxWidth: isMobile ? '80%' : '1323px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #ccc',
  borderRadius: '4px',
  px: isMobile ? 2 : 5,
  py: isMobile ? 2 : 5,
  boxShadow: 1,
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: 'flex-start',
});

const imageContainerBox = (isMobile: boolean) => ({
  width: isMobile ? '100%' : '662px',
  height: isMobile ? 'auto' : '597px',
  marginBottom: isMobile ? '20px' : '0',
});

const rightContentContainer = (isMobile: boolean) => ({
  width: isMobile ? '100%' : 'auto',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: isMobile ? '0' : '91px',
  marginTop: isMobile ? '0' : '35px',
  alignItems: 'flex-start',
});

const buttonBoxStyle = (isMobile: boolean) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 2,
  justifyContent: isMobile ? 'center' : 'flex-start',
  width: '100%',
});

const priceContainer = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap' as const,
  gap: '8px',
};



export const ProductDetails = ({ product, userId }: ProductDetailsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, userId }));
  };

  const handleEdit = () => {
    navigate(`/user/${userId}/create-product/${product.id}`);
  };


  return (
    <Box sx={detailOuterContainerBox}>
      <Typography variant="h4" sx={typoStyle(isMobile)}>Products Detail</Typography>
      <Box sx={detailInnerContainerBox(isMobile)}>
        <Box sx={imageContainerBox(isMobile)}>
          <img src={product.imageUrl} alt={product.name} style={imageStyle} />
        </Box>
        <Box sx={rightContentContainer(isMobile)}>
          <Typography variant="subtitle1" sx={categoryStyle}>{product.category}</Typography>
          <Typography variant="h4" sx={productStyle(isMobile)}>{product.name}</Typography>
          <Box sx={priceContainer}>
            <Typography variant="h5" sx={priceStyle(isMobile)}>
              ${product.price}
            </Typography>
            <StockTag inStock={product.inStock} />
          </Box>
          <Typography variant="body2" sx={descriptionStyle}>{product.description}</Typography>
          <Box sx={buttonBoxStyle(isMobile)}>
            <CustomButton width='133px' isBold={true} text="Add To Cart" onClick={handleAddToCart} />
            {isAdmin && (
              <Button variant="outlined" sx={editButtonStyle} onClick={handleEdit}>
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
