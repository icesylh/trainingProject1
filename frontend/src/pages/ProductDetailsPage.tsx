import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import FakeHeader from '../components/Header';
import FakeFooter from '../components/Footer';

const outContainerStyle = {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: '60px',
    pb: '60px',
};

const ProductDetailsPage = () => {
    const { userId } = useParams<{ userId: string }>();
    return (
        <>
            <FakeHeader />
            <Box sx={outContainerStyle}>
                <ProductDetails userId={userId ?? ''} />
            </Box>
            <FakeFooter />
        </>
    );
};

export default ProductDetailsPage;
