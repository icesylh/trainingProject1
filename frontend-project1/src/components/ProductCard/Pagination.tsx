import { Box, Button } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const paginationContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mt: 3, 
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '4px',
};

const buttonStyle = {
  minWidth: '41px',
  minHeight: '42px',
  backgroundColor: 'white',
  color: '#5048E5',
  borderRight: '1px solid rgba(0, 0, 0, 0.23)',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#5048E5',
  color: 'white',
}


export const Pagination = ({ currentPage, totalPages, onPageChange }: Readonly<PaginationProps>) => {
  return (
    <Box sx={paginationContainer}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={buttonStyle}
      >
        {'<<'}
      </Button>
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          sx={index + 1 === currentPage ? activeButtonStyle : buttonStyle }
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={ buttonStyle }
      >
        {'>>'}
      </Button>
    </Box>
  );
};
