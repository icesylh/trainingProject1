import { Box, Typography } from '@mui/material';

const FakeFooter = () => {
  return (
    <Box sx={{ height: '60px', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
      <Typography variant="h6">Fake Footer</Typography>
    </Box>
  );
};

export default FakeFooter;
