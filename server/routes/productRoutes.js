const express = require('express');
const router = express.Router();
const { addProduct, getProducts, createProduct, getAllProducts, getProductCount, deleteProduct,getProductById } = require('../controllers/productController');
const multer = require('multer');

// Configure Multer for multiple file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/avif',
      'image/svg+xml',
      'image/jpg'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPG, PNG, GIF, WebP, AVIF, SVG) are allowed'));
  }
});


// Routes
router.post('/add', upload.array('images', 3), addProduct); // Updated to handle multiple images
router.get('/all', getProducts);
router.post('/add1', upload.array('images', 3), createProduct); // Updated to handle multiple images
router.get('/all1', getAllProducts);
router.get('/count', getProductCount);
router.delete('/delete/:id', deleteProduct);
router.get('/product/:id', getProductById);

module.exports = router;