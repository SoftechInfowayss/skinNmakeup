const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

router.post('/add', upload.single('image'), addProduct);
router.get('/all', getProducts);

module.exports = router;
