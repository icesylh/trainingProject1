import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useState} from "react";
import CartIcon from "../components/Cart/CartIcon";
import Cart from "../components/Cart/Cart";

const outContainerStyle = {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: '60px',
    pb: '60px',
};

const headerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
};

const ProductDetailsPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // TODO: Fix header
    return (
        <>
            <Box sx={headerStyle}>
                <Header />
                {userId && <CartIcon onClick={toggleCart} userId={userId} />}
            </Box>

            <Box sx={outContainerStyle}>
                <ProductDetails userId={userId ?? ''} />
            </Box>
            {isCartOpen && <Cart onClose={toggleCart} />}
            <Footer />
        </>
    );
};

export default ProductDetailsPage;
