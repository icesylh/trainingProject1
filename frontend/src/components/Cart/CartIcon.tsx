// components/Cart/CartIcon.tsx
import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CartIconProps {
    onClick: () => void;
    userId: string;
}

const CartIcon = ({ onClick, userId }: CartIconProps) => {
    const cart = useSelector((state: RootState) => state.products.cart[userId] || []);
    const totalQuantity = cart.reduce((total, item) => total + item.cartQuantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.cartQuantity, 0);

    return (
        <IconButton color="inherit" onClick={onClick}>
            <Badge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartIcon />
            </Badge>
            <span style={{ marginLeft: '8px', color: 'black' }}>${totalPrice.toFixed(2)}</span>
        </IconButton>
    );
};

export default CartIcon;
