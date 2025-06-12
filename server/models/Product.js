const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100 
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 1000 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  category: { 
    type: String, 
    required: true,
    trim: true,
    enum: ['Skincare', 'Makeup', 'Haircare', 'Fragrance'] // Add more categories as needed
  },
  subcategory: { 
    type: String, 
    required: true,
    trim: true 
  },
  images: [{
    data: { 
      type: Buffer,
      required: true 
    },
    contentType: { 
      type: String,
      required: true,
      enum: ['image/jpeg', 'image/png', 'image/gif'] // Supported image types
    }
  }],
  quantity: { 
    type: Number,
    required: true,
    min: 0,
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Add timestamps for automatic createdAt and updatedAt fields
  timestamps: true,
  // Ensure the images array doesn't exceed 3 items
  validate: {
    validator: function(v) {
      return this.images.length <= 3;
    },
    message: 'A product can have a maximum of 3 images.'
  }
});

// Add indexes for better query performance
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ createdAt: -1 });

// Check if model already exists before defining it
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);