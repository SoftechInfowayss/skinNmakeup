const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String
  },
  createdAt: { type: Date, default: Date.now }
});

// Check if model already exists before defining it
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);