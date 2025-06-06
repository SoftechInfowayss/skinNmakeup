const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, subcategory } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      subcategory,
    });

    // Save image data in database
    if (req.file) {
      newProduct.image.data = fs.readFileSync(req.file.path);
      newProduct.image.contentType = req.file.mimetype;
    }

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added', product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding product', error });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error });
  }
};



// Create a new product (POST API)
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, subcategory } = req.body;
    const image = req.file;

    if (!title || !price || !category || !subcategory) {
      return res.status(400).json({ success: false, message: 'Title, price, category, and subcategory are required' });
    }

    const validCategories = ['Hair', 'Makeup', 'Skincare', 'Fragrance'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: 'Product with this title already exists' });
    }

    let imageData = {};
    if (image) {
      imageData = {
        data: image.buffer,
        contentType: image.mimetype
      };
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      subcategory,
      image: imageData
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
        createdAt: newProduct.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
};

// Get all products (GET API)
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
            data: product.image.data.toString('base64') // Convert Buffer to Base64
          }
        : null,
      createdAt: product.createdAt
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
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is provided
    if (!id) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Try to find the product
    const product = await Product.findById(id);

    // If product not found
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: {
        id: product._id,
        title: product.title,
        category: product.category,
        subcategory: product.subcategory
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};


// module.exports = { createProduct, getAllProducts };

module.exports = { addProduct, getProducts,createProduct,getAllProducts ,getProductCount ,deleteProduct};
