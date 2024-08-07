// components/Cart/Cart.tsx
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { Box, Typography, Button, IconButton, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
    addToCart,
    removeFromCart,
    removeItemFromCart,
    applyDiscountCode,
    removeDiscountCode, pushCart,
} from '../../store/productsSlice';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import {debounce} from "lodash";

interface Product {
    id: number;
    id1?: string;
    image?: string;
    imageUrl?: string;
    name: string;
    price: number;
    category: string;
    description: string;
    quantity?: number;
    inStockQuantity?: number;
    cartQuantity: number;
    inStock: boolean;
    discount: number;
    seller?: string;
}

interface CartProps {
    onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const cart = useSelector((state: RootState) => (userId ? state.products.cart[userId] : []) || []);
    const [discountCode, setDiscountCode] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);



    const cartStyle = {
        width: isMobile ? '100vw' : '400px',
        backgroundColor: 'white',
        position: 'fixed' as const,
        right: '0',
        top: '0',
        height: '100vh',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        overflowY: 'auto' as const,
    };


    const cartHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        backgroundColor: '#5048e6',
        color: 'white',
        padding: '10px',
        borderRadius: '4px 4px 0 0',
        paddingLeft: '20px',
    };


    const cartContentStyle = {
        padding: '20px',
    };


    const cartItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        gap: '16px',
    };

    const cartItemInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: 1,
    };

    const cartItemDetailsStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    };

    const cartItemTopStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const cartItemActionsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 1,
    };

    const quantityControlStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const quantityButtonStyle = {
        minWidth: '30px',
        height: '30px',
        border: 'none',
        backgroundColor: 'transparent',
        color: '#333',
        cursor: 'pointer',
    };

    const quantityDisplayStyle = {
        minWidth: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft: '1px solid #ccc',
        borderRight: '1px solid #ccc',
    };


    const removeButtonStyle = {
        textTransform: 'none',
        color: 'gray',
        textDecoration: 'underline',
        fontSize: '0.875rem',
    };
    const discountContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        mb: 2,
    };

    const priceSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        mt: 2,
    };

    const priceTextStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
    };

    const debouncedPushCart = useCallback(
        debounce((id: string, quantity: number) => {
            // @ts-ignore
            dispatch(pushCart({ productId: id, quantity }));
        }, 300),
        [dispatch]
    );


    const handleAdd = (id: string, quantity:number) => {
        if (userId) {
            quantity+=1;
            dispatch(addToCart({ productId: id, userId ,quantity},));
            debouncedPushCart(id, quantity);
        }
    };

    const handleRemove = (id: string, quantity:number) => {
        if (userId) {
            quantity-=1;
            dispatch(removeFromCart({ productId: id, userId,quantity }));
            debouncedPushCart(id, quantity);
        }
    };

    const handleRemoveItem = (id: string) => {
        if (userId) {
            dispatch(removeItemFromCart({ productId: id, userId }));
            const quantity = 0;
            debouncedPushCart(id, quantity);
        }
    };

    const handleApplyDiscount = () => {
        if (discountCode.trim() !== '') {
            dispatch(applyDiscountCode(discountCode));
        } else {
            dispatch(removeDiscountCode());
        }
    };


    return (
        <Box ref={cartRef} sx={cartStyle}>
            <Box sx={cartHeaderStyle}>
                <Typography variant="h6" fontWeight="bold">Cart ({cart.length})</Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={cartContentStyle}>
                {cart.map((item: Product) => (
                    <Box key={item.id1} sx={cartItemStyle}>
                        <Box sx={cartItemInfoStyle}>
                            <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                            <Box sx={cartItemDetailsStyle}>
                                <Box sx={cartItemTopStyle}>
                                    <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                                    <Typography variant="body1" color="#673AB7" fontWeight="bold">${item.price.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={cartItemActionsStyle}>
                                    <Box sx={quantityControlStyle}>
                                        <button onClick={() => handleRemove(item.id1||"",item.cartQuantity)} style={quantityButtonStyle}>-</button>
                                        <div style={quantityDisplayStyle}>{item.cartQuantity}</div>
                                        <button onClick={() => handleAdd(item.id1||"",item.cartQuantity)} style={quantityButtonStyle}>+</button>
                                    </Box>
                                    <Button onClick={() => handleRemoveItem(item.id1||"")} sx={removeButtonStyle} size="small">Remove</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={discountContainerStyle}>
                    <TextField
                        label="Please Apply Discount Code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        fullWidth
                    />
                    <Button onClick={handleApplyDiscount} variant="contained" sx={{ backgroundColor: '#5048e6' }}>Apply</Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={priceSectionStyle}>
                    <Typography sx={priceTextStyle}>Subtotal: <span>${cart.reduce((total: number, item: Product) => total + item.price * item.cartQuantity, 0).toFixed(2)}</span></Typography>
                    <Typography sx={priceTextStyle}>Discount: <span>${cart.reduce((total: number, item: Product) => total + item.discount * item.cartQuantity, 0).toFixed(2)}</span></Typography>
                    <Typography sx={priceTextStyle}>Tax: <span>${(cart.reduce((total: number, item: Product) => total + (item.price -  item.discount) * item.cartQuantity, 0) * 0.1).toFixed(2)}</span></Typography>
                    <Typography sx={priceTextStyle}>Estimated total: <span>${(cart.reduce((total: number, item: Product) => total + (item.price -  item.discount) * item.cartQuantity, 0) * 1.1).toFixed(2)}</span></Typography>
                </Box>
                <Button variant="contained" color="primary" sx={{ mt: 'auto', backgroundColor: '#5048e6' }} fullWidth>Continue to checkout</Button>
            </Box>
        </Box>


    );
};

export default Cart;
