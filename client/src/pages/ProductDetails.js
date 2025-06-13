import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/product/${id}`, {
          timeout: 5000,
        });
        if (response.data.success) {
          setProduct(response.data.product);
          setSelectedImage(response.data.product.images?.[0] || response.data.product.image);
          setLoading(false);
        } else {
          setError('Product not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load product. Please try again.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product.quantity === 0) return;
    setCartMessage('Added to cart!');
    setTimeout(() => setCartMessage(null), 3000);
    // Add to cart logic here (e.g., update cart state or make API call)
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    if (product.quantity === 0) return;
    alert('Proceeding to checkout...');
    // Buy now logic here (e.g., redirect to checkout page)
  };

  // Handle Wishlist Toggle
  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    // Wishlist logic here (e.g., update wishlist state or make API call)
  };

  // Shimmer Loading Component
  const Shimmer = () => (
    <div className="animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="w-full h-96 bg-gray-200 rounded-2xl"></div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-12 bg-gray-200 rounded-full w-40"></div>
            <div className="h-12 bg-gray-200 rounded-full w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Shimmer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-6 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      {/* Toast Notification */}
      {cartMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {cartMessage}
        </motion.div>
      )}

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Image Gallery (Left Sidebar) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {/* Main Image */}
            <motion.div
              className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-lg border border-pink-100/50 group"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={
                  selectedImage
                    ? `data:${selectedImage.contentType};base64,${selectedImage.data}`
                    : 'https://via.placeholder.com/400x400?text=No+Image'
                }
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/400x400?text=Image+Error')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Eye size={24} className="text-pink-300" />
              </motion.div>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === image ? 'border-pink-400' : 'border-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/64x64?text=Error')}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Details (Right Side) */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1
                className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.title || 'Untitled Product'}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.price / 20) ? '#f59e0b' : 'none'}
                      stroke={i < Math.floor(product.price / 20) ? '#f59e0b' : '#d1d5db'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({Math.floor(product.price / 20)} / 5)
                </span>
              </div>
              <p className="text-2xl font-semibold text-pink-600 mb-4">
                ${product.price ? product.price.toFixed(2) : '0.00'}
              </p>
              <p
                className="text-gray-600 mb-6 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {product.description || 'No description available.'}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <p className="text-gray-600">{product.category || 'Uncategorized'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Subcategory:</span>
                  <p className="text-gray-600">{product.subcategory || 'None'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Availability:</span>
                  <p className={`text-sm ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                  <p className="text-gray-600">
                    {new Date(product.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: product.quantity > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: product.quantity > 0 ? 0.95 : 1 }}
                  className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 text-lg font-medium transition-colors ${
                    product.quantity > 0
                      ? 'bg-pink-400 text-white hover:bg-pink-500'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: product.quantity > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: product.quantity > 0 ? 0.95 : 1 }}
                  className={`flex-1 py-3 rounded-full text-lg font-medium transition-colors ${
                    product.quantity > 0
                      ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white hover:from-rose-500 hover:to-purple-500'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleBuyNow}
                  disabled={product.quantity === 0}
                >
                  Buy Now
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isWishlist ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={toggleWishlist}
              >
                <Heart size={20} fill={isWishlist ? '#e11d48' : 'none'} />
                {isWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <h2
            className="text-3xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Product Details
          </h2>
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
            <p
              className="text-gray-600 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {product.description || 'No additional details available.'}
            </p>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Created:</span>{' '}
                {new Date(product.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Updated:</span>{' '}
                {new Date(product.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </li>
            </ul>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-pink-400 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm">© 2025 Beauty Hub. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="/about" className="hover:text-pink-200 transition-colors">About</a>
            <a href="/contact" className="hover:text-pink-200 transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-pink-200 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;