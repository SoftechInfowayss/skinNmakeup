const express = require('express');
const router = express.Router();
const { addProduct, getProducts,createProduct,getAllProducts } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

router.post('/add', upload.single('image'), addProduct);
router.get('/all', getProducts);
router.post('/add1', upload.single('image'), createProduct);
router.get('/all1', getAllProducts);
module.exports = router;
