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
    enum: ['Skincare', 'Makeup', 'Haircare', 'Fragrance'] // Extend as needed
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
      enum: ['image/jpeg', 'image/png', 'image/gif'] 
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
  timestamps: true // automatically adds `createdAt` and `updatedAt`
});

// ✅ Move the image count validation outside of the schema options
productSchema.path('images').validate(function (images) {
  return images.length <= 3;
}, 'A product can have a maximum of 3 images.');

// ✅ Indexing for performance
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ createdAt: -1 });

// Avoid redefining model
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
