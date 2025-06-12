const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Add a new product (POST API)
const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, subcategory, quantity } = req.body;
    const files = req.files;

    if (!title || !price || !category || !subcategory || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Title, price, category, subcategory, and quantity are required' });
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be a non-negative number' });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      subcategory,
      quantity: parsedQuantity
    });

    if (files && files.length > 0) {
      if (files.length > 3) {
        return res.status(400).json({ success: false, message: 'Maximum of 3 images allowed per product' });
      }
      newProduct.images = files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    } else {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    await newProduct.save();
    res.status(201).json({ 
      success: true, 
      message: 'Product added', 
      product: {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        subcategory: newProduct.subcategory,
        images: newProduct.images.map(image => ({
          contentType: image.contentType,
          data: image.data.toString('base64')
        })),
        quantity: newProduct.quantity,
        createdAt: newProduct.createdAt,
        updatedAt: newProduct.updatedAt
      }
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ success: false, message: 'Too many files uploaded. Maximum 3 images allowed.' });
      }
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds the 5MB limit.' });
      }
      return res.status(400).json({ success: false, message: `Multer error: ${error.message}` });
    }
    res.status(500).json({ success: false, message: 'Error adding product', error: error.message });
  }
};

// Get all products (GET API - Simple Version)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const productList = products.map(product => ({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      image: product.image && product.image.data
        ? {
            contentType: product.image.contentType,
            data: product.image.data.toString('base64')
          }
        : null,
      images: product.images && Array.isArray(product.images)
        ? product.images.map(image => ({
            contentType: image.contentType,
            data: image.data.toString('base64')
          }))
        : [],
      quantity: product.quantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};

// Create a new product (POST API - Detailed Version)
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, subcategory, quantity } = req.body;
    const files = req.files;

    if (!title || !price || !category || !subcategory || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Title, price, category, subcategory, and quantity are required' });
    }

    const validCategories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: 'Product with this title already exists' });
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be a non-negative number' });
    }

    let imagesData = [];
    if (files && files.length > 0) {
      if (files.length > 3) {
        return res.status(400).json({ success: false, message: 'Maximum of 3 images allowed per product' });
      }
      imagesData = files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      subcategory,
      images: imagesData,
      quantity: parsedQuantity
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        subcategory: newProduct.subcategory,
        images: newProduct.images.map(image => ({
          contentType: image.contentType,
          data: image.data.toString('base64')
        })),
        quantity: newProduct.quantity,
        createdAt: newProduct.createdAt,
        updatedAt: newProduct.updatedAt
      }
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ success: false, message: 'Too many files uploaded. Maximum 3 images allowed.' });
      }
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds the 5MB limit.' });
      }
      return res.status(400).json({ success: false, message: `Multer error: ${error.message}` });
    }
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
};

// Get all products (GET API - Detailed Version)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productList = products.map(product => ({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      image: product.image && product.image.data
        ? {
            contentType: product.image.contentType,
            data: product.image.data.toString('base64')
          }
        : null,
      images: product.images && Array.isArray(product.images)
        ? product.images.map(image => ({
            contentType: image.contentType,
            data: image.data.toString('base64')
          }))
        : [],
      quantity: product.quantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      products: productList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving products', error: error.message });
  }
};

// Get total number of products (GET API)
const getProductCount = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({
      success: true,
      message: 'Total product count retrieved successfully',
      totalProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving product count',
      error: error.message
    });
  }
};

// Delete a product (DELETE API)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: {
        id: product._id,
        title: product.title,
        category: product.category,
        subcategory: product.subcategory,
        quantity: product.quantity
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};

module.exports = { addProduct, getProducts, createProduct, getAllProducts, getProductCount, deleteProduct };