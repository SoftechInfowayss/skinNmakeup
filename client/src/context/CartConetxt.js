// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ userId, children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  // Fetch cart on load
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/api/cart/${userId}`)
        .then(res => setCart(res.data.cart))
        .catch(err => console.error('Error loading cart:', err));
    }
  }, [userId]);

  // Add to cart
  const addToCart = useCallback(async (productId) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/cart/add`, {
        userId,
        productId
      });
      setCart(res.data.cart);
      setToast({ message: 'Added to cart!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Add to cart error:', err);
      setToast({ message: 'Error adding to cart', type: 'error' });
    }
  }, [userId]);

  // Remove from cart
  const removeFromCart = useCallback(async (productId) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/cart/remove`, {
        userId,
        productId
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error('Remove from cart error:', err);
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toast }}>
      {children}
    </CartContext.Provider>
  );
};
