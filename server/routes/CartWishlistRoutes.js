const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/CartandWhishlist');

// Cart
router.get('/cart/:userId', getCart);
router.post('/cart/add', addToCart);
router.post('/cart/remove', removeFromCart);
router.post('/cart/update', updateCartQuantity);

// Wishlist
router.get('/wishlist/:userId', getWishlist);
router.post('/wishlist/add', addToWishlist);
router.post('/wishlist/remove', removeFromWishlist);

module.exports = router;
