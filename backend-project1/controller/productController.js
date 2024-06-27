const crypto = require('crypto');
const mongoose = require('mongoose');
const Product = require('../data/models/Products');

const generateObjectIdFromEmail = (email) => {
  const hash = crypto.createHash('sha256').update(email).digest('hex');
  return new mongoose.Types.ObjectId(hash.substring(0, 24)); 
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, quantity, image, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: 'userEmail is required' });
    }

    const sellerObjectId = generateObjectIdFromEmail(userEmail);

    const product = new Product({
      name,
      description,
      category,
      price,
      quantity,
      image,
      seller: sellerObjectId, 
      id1: new mongoose.Types.ObjectId()
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error('Error creating product:', error); 
    next(error);
  }
};

exports.getProductsByUserId = async (req, res, next) => {
  try {
    const email = req.params.userId;
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is missing' });
    }
    const sellerObjectId = generateObjectIdFromEmail(email);

    const products = await Product.find({ seller: sellerObjectId });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const productData = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { id1: productId },
      productData,
      { new: true, omitUndefined: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    next(error); 
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOneAndDelete({ id1: productId });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
