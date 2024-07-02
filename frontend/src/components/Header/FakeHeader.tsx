import { Box, Typography } from '@mui/material';

const FakeHeader = () => {
  return (
    <Box sx={{ height: '60px', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6">Fake Header</Typography>
    </Box>
  );
};

export default FakeHeader;
