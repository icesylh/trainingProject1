import { Box, Typography } from '@mui/material';

interface StockTagProps {
  inStock: boolean;
}

const boxStyle = {
  width: '76px',
  height: '30px',
  borderRadius: '4px', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ml: 1.5
};

const typoStyle = {
  fontWeight: 'normal',
  whiteSpace: 'nowrap'
}

export const StockTag = ({ inStock }: StockTagProps) => {
  return (
    <Box sx={{
      ...boxStyle,
      backgroundColor: inStock ? '#E0F7E9' : '#FDEDEC' 
    }}>
      <Typography variant="caption" sx={{ ...typoStyle, color: inStock ? '#28A745' : '#EA3D2F'}}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </Typography>
    </Box>
  );
};
