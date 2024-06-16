import { Button } from '@mui/material';
import { SxProps } from '@mui/system';

interface CustomButtonProps {
  width?: string;
  height?: string;
  text: string;
  onClick?: () => void;
  sx?: SxProps;
  isBold?: boolean;
}

export const CustomButton = ({ width, height, text, onClick, sx, isBold }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: width ?? 'auto',
        height: height ?? 'auto',
        backgroundColor: '#6200EA',
        color: 'white',
        fontWeight: isBold ? 'bold' : 'normal',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'darkviolet',
        },
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};
