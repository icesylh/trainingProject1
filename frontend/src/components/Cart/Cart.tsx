// components/Cart/Cart.tsx
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToCart, removeFromCart, applyDiscountCode } from '../../store/productsSlice';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

interface Product {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    category: string;
    description: string;
    inStockQuantity: number;
    cartQuantity: number;
    inStock: boolean;
    discount: number;
}

const Cart = () => {
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const cart = useSelector((state: RootState) => (userId ? state.products.cart[userId] : []) || []);
    const [discountCode, setDiscountCode] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const cartStyle = {
        width: isMobile ? '100%' : '400px',
        backgroundColor: 'white',
        padding: isMobile ? '10px' : '20px',
        position: 'fixed',
        right: '0',
        top: '0',
        height: '100vh',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
    };

    const cartItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const handleAdd = (id: number) => {
        if (userId) {
            dispatch(addToCart({ productId: id, userId }));
        }
    };

    const handleRemove = (id: number) => {
        if (userId) {
            dispatch(removeFromCart({ productId: id, userId }));
        }
    };

    const handleApplyDiscount = () => {
        dispatch(applyDiscountCode(discountCode));
    };

    return (
        <Box sx={cartStyle}>
            <Typography variant="h6">Cart ({cart.length})</Typography>
            {cart.map((item: Product) => (
                <Box key={item.id} sx={cartItemStyle}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <Typography>{item.name}</Typography>
                    <Typography>${item.price}</Typography>
                    <Box>
                        <IconButton onClick={() => handleRemove(item.id)}><RemoveIcon /></IconButton>
                        <Typography>{item.cartQuantity}</Typography>
                        <IconButton onClick={() => handleAdd(item.id)}><AddIcon /></IconButton>
                    </Box>
                    <Button onClick={() => handleRemove(item.id)}>Remove</Button>
                </Box>
            ))}
            <TextField
                label="Apply Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button onClick={handleApplyDiscount}>Apply</Button>
            <Box>
                <Typography>Subtotal: ${cart.reduce((total: number, item: Product) => total + item.price * item.cartQuantity, 0)}</Typography>
                <Typography>Discount: ${cart.reduce((total: number, item: Product) => total + item.discount * item.cartQuantity, 0)}</Typography>
                <Typography>Total: ${cart.reduce((total: number, item: Product) => total + (item.price - item.discount) * item.cartQuantity, 0)}</Typography>
            </Box>
            <Button variant="contained" color="primary">Continue to checkout</Button>
        </Box>
    );
};

export default Cart;
