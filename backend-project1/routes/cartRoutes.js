const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const jwtController = require('../controller/jwt'); // 引入身份验证中间件

router.get('/', jwtController.check, cartController.getCart);
router.post('/add', jwtController.check, cartController.addToCart);
router.post('/update', jwtController.check, cartController.updateCartItem);
router.delete('/remove', jwtController.check, cartController.removeCartItem);

module.exports = router;
