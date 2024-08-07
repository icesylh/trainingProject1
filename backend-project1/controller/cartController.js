const Cart = require('../data/models/cart');
const {log} = require("debug");

exports.getCart = async (req, res) => {
    console.log(req);
    try {

        let cart = await Cart.findOne({ userId: req.user });
        if (!cart) {
            cart = new Cart({ userId: req.user, items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user });
        if (!cart) {
            cart = new Cart({ userId: req.user, items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    if(quantity === 0){
        try {
            let cart = await Cart.findOne({ userId: req.user });
            if (!cart) {
                cart = new Cart({ userId: req.user, items: [] });
            }
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        try {
            let cart = await Cart.findOne({ userId: req.user });
            if (!cart) {
                cart = new Cart({ userId: req.user, items: [] });
            }
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                return res.status(200).json(cart);
            } else {
                cart.items.push({ productId, quantity });
                await cart.save();
                return res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

exports.removeCartItem = async (req, res) => {
    const { productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
