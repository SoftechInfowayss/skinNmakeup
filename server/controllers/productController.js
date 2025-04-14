const fs = require('fs');

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

module.exports = { addProduct, getProducts };
