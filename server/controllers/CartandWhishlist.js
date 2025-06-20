const User = require('../models/user');
const Product = require('../models/Product');

// ✅ Get user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving cart', error: error.message });
  }
};

// ✅ Add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ success: true, message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
  }
};

// ✅ Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.status(200).json({ success: true, message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing from cart', error: error.message });
  }
};

// ✅ Update quantity in cart
const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    const user = await User.findById(userId);
    const cartItem = user.cart.find(item => item.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json({ success: true, message: 'Cart updated', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating cart', error: error.message });
  }
};

// ✅ Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Wishlist retrieved successfully',
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving wishlist', error: error.message });
  }
};

// ✅ Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }

    await user.save();
    res.status(200).json({ success: true, message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding to wishlist', error: error.message });
  }
};

// ✅ Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(pid => pid.toString() !== productId);
    await user.save();

    res.status(200).json({ success: true, message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing from wishlist', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
