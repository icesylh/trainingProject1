// components/Cart/CartIcon.tsx
import React from 'react';
import { IconButton, Badge, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CartIconProps {
    onClick: () => void;
    userId: string;
}

const CartIcon = ({ onClick, userId }: CartIconProps) => {
    const cart = useSelector((state: RootState) => (userId ? state.products.cart[userId] : []) || []);
    const cartQuantity = cart.reduce((total, item) => total + item.cartQuantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.cartQuantity, 0).toFixed(2);

    return (
        <Box onClick={onClick} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <IconButton color="inherit">
                <Badge badgeContent={cartQuantity} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <Typography sx={{ ml: 1 }}>${cartTotal}</Typography>
        </Box>
    );
};

export default CartIcon;
