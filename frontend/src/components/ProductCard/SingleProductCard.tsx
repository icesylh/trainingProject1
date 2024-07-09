import { Box, Typography, Button, IconButton, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useParams } from 'react-router-dom';

interface ProductCardProps {
  id1: string;
  image: string;
  namee: string;
  price: number;
  cartQuantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onEdit: () => void;
  isAdmin: boolean;
  inStock: boolean;
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '10px',
  width: '242px',
  height: '303px',
  display: 'flex',
  flexDirection: 'column' as const,
};

const imageStyle = {
  height: '198px',
  width: '100%',
  objectFit: 'cover' as const,
  marginBottom: '10px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const quantityContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#5048E5',
  borderRadius: '4px',
  width: '110px',
};

const buttonStyle = {
  height: '26px',
  width: '110px',
  textTransform: 'none' as const,
};

const addButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6200EA',
  color: 'white',
  marginRight: '2px',
  '&:hover': {
    backgroundColor: 'darkviolet',
  },
};

const editButtonStyle = {
  ...buttonStyle,
  borderColor: '#ccc',
  color: 'black',
  marginLeft: '10px',
};

const iconButtonStyle = {
  height: '26px',
  width: '26px',
  backgroundColor: '#5048E5',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkviolet',
  },
};

const priceTextStyle = {
  color: 'black',
  textAlign: 'left',
  width: '100%',
  paddingLeft: '8px',
  marginTop: '5px',
  marginBottom: '5px',
  fontSize: '1.10rem',
};

const nameTextStyle = {
  color: 'gray',
  textAlign: 'left',
  width: '100%',
  paddingLeft: '8px',
};

const quantityTextStyle = {
  color: 'white',
  margin: '0 8px',
};

export const SingleProductCard = ({
  id1,
  image,
  namee,
  price,
  cartQuantity,
  onAdd,
  onRemove,
  onEdit,
  isAdmin,
  inStock,
}: ProductCardProps) => {
  const { userId, token = ''} = useParams<{ userId: string; token: string }>();


  const navigate = useNavigate();

  const handleCardClick = () => {
    if (userId && token && id1) {
      localStorage.setItem('navigationInfo', JSON.stringify({ userId, token, productId: id1 }));
      navigate(`/user/${userId}/${token}/product/${id1}`);
    }
  };
  

  const formattedPrice = price ? price.toFixed(2) : '0.00';

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (inStock) {
      onAdd();
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (cartQuantity > 0) {
      onRemove();
    }
  };

  return (
    <Box sx={cardStyle}>
      <img src={image} alt={namee} style={imageStyle} onClick={handleCardClick} />
      <Typography variant="body2" sx={nameTextStyle}>{namee}</Typography>
      <Typography variant="body1" sx={priceTextStyle}>${formattedPrice}</Typography>
      {
        cartQuantity === 0 ? (
          <Box sx={buttonContainerStyle}>
            <Button variant="contained" color="primary" onClick={handleAddClick} sx={addButtonStyle} disabled={!inStock}>
              Add
            </Button>
            {isAdmin && (
              <Button variant="outlined" sx={editButtonStyle} onClick={onEdit}>
                Edit
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={buttonContainerStyle}>
            <Box sx={quantityContainerStyle}>
              <IconButton onClick={handleRemoveClick} sx={iconButtonStyle}>
                <SvgIcon component={RemoveIcon} fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={quantityTextStyle}>{cartQuantity}</Typography>
              <IconButton onClick={handleAddClick} sx={iconButtonStyle} disabled={!inStock}>
                <SvgIcon component={AddIcon} fontSize="small" />
              </IconButton>
            </Box>
            {isAdmin && (
              <Button variant="outlined" onClick={onEdit} sx={editButtonStyle}>
                Edit
              </Button>
            )}
          </Box>
        )
      }
    </Box>
  );
};
