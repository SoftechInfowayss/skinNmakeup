// src/context/WishlistContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ userId, children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  // Fetch wishlist on load
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/api/wishlist/${userId}`)
        .then(res => setWishlist(res.data.wishlist))
        .catch(err => console.error('Error loading wishlist:', err));
    }
  }, [userId]);

  // Toggle wishlist
  const toggleWishlist = useCallback(async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        const res = await axios.post(`http://localhost:8080/api/wishlist/remove`, {
          userId,
          productId
        });
        setWishlist(res.data.wishlist);
      } else {
        const res = await axios.post(`http://localhost:8080/api/wishlist/add`, {
          userId,
          productId
        });
        setWishlist(res.data.wishlist);
      }
    } catch (err) {
      console.error('Wishlist toggle error:', err);
      setToast({ message: 'Error updating wishlist', type: 'error' });
    }
  }, [userId, wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, toast }}>
      {children}
    </WishlistContext.Provider>
  );
};
