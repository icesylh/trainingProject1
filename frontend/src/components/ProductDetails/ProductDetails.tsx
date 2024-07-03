import {Box, Typography, Button, useMediaQuery, useTheme, IconButton} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { CustomButton } from '../Button/CustomButton';
import { StockTag } from './StockTag';
import {fetchProductById, pushCart} from '../../store/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { addToCart, removeFromCart } from '../../store/productsSlice';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const detailOuterContainerBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  maxWidth: '1323px',
  boxSizing: 'border-box' as const,
  alignItems: 'center',
  justifyContent: 'center',
};

const typoStyle = (isMobile: boolean) => ({
  fontWeight: 'bold',
  textAlign: 'left',
  alignSelf: isMobile ? 'center' : 'flex-start',
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

const quantityContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#5048E5',
  borderRadius: '4px',
  width: '110px',
};

const quantityTextStyle = {
  color: 'white',
  margin: '0 8px',
};

const priceContainer = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap' as const,
  gap: '8px',
};

export const ProductDetails = ({ userId }: { userId: string }) => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>() ?? { id: '' };
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin) as boolean;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log(id);
  const product = useSelector((state: RootState) =>
      id ? state.products.products.find(p => p.id1 === id) : null
  );
  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch, product]);


  const handleEdit = () => {
    if (product) {
      navigate(`/user/${userId}/create-product/${product.id1}`);
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }



  const handleAddToCart = (quantity:number) => {
    dispatch(addToCart({ productId: product.id1||"", userId }));
    quantity+=1;
    dispatch(pushCart({productId: product.id1||"", quantity: quantity}))
  };

  const handleRemoveFromCart = (quantity:number) => {
    dispatch(removeFromCart({ productId: product.id1||"", userId }));
    quantity+=1;
    dispatch(pushCart({productId: product.id1||"", quantity: quantity}))
  };

  return (
      <Box sx={detailOuterContainerBox}>
        <Typography variant="h4" sx={typoStyle(isMobile)}>Products Detail</Typography>
        <Box sx={detailInnerContainerBox(isMobile)}>
          <Box sx={imageContainerBox(isMobile)}>
            <img src={product.image} alt={product.name} style={imageStyle} />
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
              {product.cartQuantity ? (
                  <Box sx={quantityContainerStyle}>
                    <IconButton onClick={()=>handleRemoveFromCart(product.cartQuantity)} sx={{ color: 'white' }}><RemoveIcon /></IconButton>
                    <Typography sx={quantityTextStyle}>{product.cartQuantity}</Typography>
                    <IconButton onClick={()=>handleAddToCart(product.cartQuantity)} sx={{ color: 'white' }}><AddIcon /></IconButton>
                  </Box>
              ) : (
                  <CustomButton width='133px' isBold={true} text="Add To Cart" onClick={()=>handleAddToCart(product.cartQuantity)} />
              )}


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