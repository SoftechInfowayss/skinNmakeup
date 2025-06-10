import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [retryCount, setRetryCount] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/products/all1', {
        timeout: 5000,
      });
      console.log('API Response:', response.data); // Debug log
      const fetchedProducts = Array.isArray(response.data.products) ? response.data.products : [];
      setProducts(fetchedProducts);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      setLoading(false);
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [retryCount]);

  // Get unique categories
  const categories = ['all', ...new Set(
    products
      .filter(product => product && product.category)
      .map(product => product.category)
  )];

  // Filter products
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product && product.category === selectedCategory);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
      <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-pink-600 text-white py-4 shadow-md">
        <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Skin Makeup</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:text-pink-200">Home</a>
            <a href="/categories" className="font-semibold">Categories</a>
            <a href="/cart" className="hover:text-pink-200">Cart</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
            Explore Our Makeup Collection
          </h1>
          <p className="text-gray-600 md:text-lg">Discover your perfect beauty essentials</p>
        </motion.div>

        {/* Category Filters */}
        <div className="sticky top-0 bg-pink-50 py-4 z-10 shadow-sm">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-pink-600 hover:bg-pink-100 border border-pink-200'
                }`}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">
            {error}
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="ml-4 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
            >
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No products found in this category.
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="ml-4 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
            >
              Refresh
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id} // Changed from _id to id
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative mb-4 w-full h-64 overflow-hidden rounded-lg">
                    <img
                      src={
                        product.image?.data && product.image?.contentType
                          ? `data:${product.image.contentType};base64,${
                              typeof product.image.data === 'string'
                                ? product.image.data
                                : btoa(String.fromCharCode(...new Uint8Array(product.image.data)))
                            }`
                          : 'https://via.placeholder.com/300x200?text=No+Image'
                      }
                      alt={product.title || 'Product Image'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }}
                    />
                    <div className="absolute inset-0 bg-pink-500 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.title || 'Untitled Product'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description || 'No description available.'}
                  </p>
                  <p className="text-pink-600 font-bold text-lg mb-2">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {product.category || 'Uncategorized'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Subcategory: {product.subcategory || 'None'}
                  </p>

                  {/* Hover Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-4 left-4 right-4 bg-pink-600 text-white py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => console.log(`Add to cart: ${product.id}`)}
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-pink-600 text-white py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p>© 2025 Skin Makeup. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/about" className="hover:text-pink-200">About</a>
            <a href="/contact" className="hover:text-pink-200">Contact</a>
            <a href="/privacy" className="hover:text-pink-200">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoriesPage;