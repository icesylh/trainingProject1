import { Box, Typography, Button, IconButton, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useParams } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  imageUrl: string;
  namee: string;
  price: number;
  cartQuantity: number;
  inStockQuantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onEdit: () => void;
  isAdmin: boolean;
  inStock: boolean;
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '8px',
  width: '242px',
  height: '303px',
  display: 'flex',
  flexDirection: 'column' as const,
  marginRight: '4px',
  marginLeft: '4px',
  textAlign: 'center' as const,
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
  id,
  imageUrl,
  namee,
  price,
  cartQuantity,
  onAdd,
  onRemove,
  onEdit,
  isAdmin,
  inStock,
}: ProductCardProps) => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <Box sx={cardStyle}>
      <Link to={`/user/${userId}/product/${id}`}>
        <img src={imageUrl} alt={namee} style={imageStyle} />
      </Link>
      <Typography variant="body2" sx={nameTextStyle}>{namee}</Typography>
      <Typography variant="body1" sx={priceTextStyle}>${price.toFixed(2)}</Typography>
      {
        cartQuantity === 0 ? (
          <Box sx={buttonContainerStyle}>
            <Button variant="contained" color="primary" onClick={onAdd} sx={addButtonStyle} disabled={!inStock}>
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
              <IconButton onClick={onRemove} sx={iconButtonStyle}>
                <SvgIcon component={RemoveIcon} fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={quantityTextStyle}>{cartQuantity}</Typography>
              <IconButton onClick={onAdd} sx={iconButtonStyle} disabled={!inStock}>
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
