const express = require('express');
const { createProduct, getProductsByUserId, updateProduct, deleteProduct } = require('../controller/productController');

const router = express.Router();

router.get('/user/:userId/products', getProductsByUserId);

router.put('/:productId', updateProduct);

router.post('/user/:userId/products', createProduct); 

router.delete('/:productId', deleteProduct);



module.exports = router;
