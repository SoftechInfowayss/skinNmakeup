import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Filter, X, Star, Heart, Eye, ArrowLeft } from 'lucide-react';

// Main CategoriesPage component
const CategoriesPage = ({ initialCategory, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const productsPerPage = 12;

  const navigate = useNavigate(); // Hook for navigation

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/products/all1', {
        // timeout: 5000,
      });
      const fetchedProducts = Array.isArray(response.data.products) ? response.data.products : [];
      setProducts(fetchedProducts);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, retryCount]);

  // Memoized categories and subcategories
  const categories = useMemo(() => {
    return ['all', ...new Set(
      products
        .filter(product => product && product.category)
        .map(product => product.category)
    )];
  }, [products]);

  const subcategories = useMemo(() => {
    return ['all', ...new Set(
      products
        .filter(product => product && product.subcategory && (selectedCategory === 'all' || product.category === selectedCategory))
        .map(product => product.subcategory)
    )];
  }, [products, selectedCategory]);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(product => product && product.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedSubcategory !== 'all') {
      result = result.filter(product => product && product.subcategory === selectedSubcategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        (product.title && product.title.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortOption === 'name') {
      result = [...result].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    return result;
  }, [products, selectedCategory, selectedSubcategory, searchQuery, sortOption, priceRange]);

  // Memoized paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Debounce search input
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  // Add to cart handler
  const addToCart = useCallback((productId) => {
    setCart(prev => [...prev, productId]);
    setToast({ message: 'Added to cart!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Toggle wishlist handler
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  }, []);

  // Navigate to Product Detail Page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Shimmer loading component
  const ShimmerCard = () => (
    <div className="bg-white/90 p-6 rounded-2xl shadow-lg animate-pulse">
      <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );

  // Memoized ProductCard component
  const ProductCard = React.memo(({ product }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100/50 overflow-hidden cursor-pointer ${product.quantity === 0 ? 'opacity-75' : ''}`}
      style={{ willChange: 'transform, opacity' }}
      onClick={() => handleProductClick(product.id)} // Navigate to product detail page
    >
      {/* Badges */}
      {product.price < 20 && (
        <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          Sale
        </span>
      )}
      {product.id % 5 === 0 && (
        <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          New
        </span>
      )}
      {product.quantity === 0 && (
        <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          Unavailable
        </span>
      )}

      {/* Image */}
      <div className="relative mb-4 w-full h-64 overflow-hidden rounded-lg">
        <img
          src={
            product.images?.[0]?.data && product.images?.[0]?.contentType
              ? `data:${product.images[0].contentType};base64,${
                  typeof product.images[0].data === 'string'
                    ? product.images[0].data
                    : btoa(String.fromCharCode(...new Uint8Array(product.images[0].data)))
                }`
              : 'https://via.placeholder.com/300x200?text=No+Image'
          }
          alt={product.title || 'Product Image'}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
          }}
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-40">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.title || 'Untitled Product'}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-grow">
          {product.description || 'No description available.'}
        </p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-pink-600 font-bold text-lg">
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.price / 20) ? '#f59e0b' : 'none'}
                stroke={i < Math.floor(product.price / 20) ? '#f59e0b' : '#d1d5db'}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          {product.category || 'Uncategorized'} / {product.subcategory || 'None'}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <motion.button
          whileHover={{ scale: product.quantity > 0 ? 1.05 : 1 }}
          whileTap={{ scale: product.quantity > 0 ? 0.95 : 1 }}
          className={`flex-1 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
            product.quantity > 0
              ? 'bg-pink-600 text-white hover:bg-pink-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={() => product.quantity > 0 && addToCart(product.id)}
          disabled={product.quantity === 0}
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full ${wishlist.includes(product.id) ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'} transition-colors`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlist.includes(product.id) ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        >
          <Heart size={16} fill={wishlist.includes(product.id) ? '#e11d48' : 'none'} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gray-100 text-gray-600 transition-colors"
          onClick={() => alert(`Quick view for ${product.title}`)}
          aria-label={`Quick view ${product.title}`}
        >
          <Eye size={16} />
        </motion.button>
      </div>
    </motion.div>
  ));

  return (
    <div className="bg-gradient-to-b from-pink-50 to-rose-50 min-h-screen flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-2xl z-50 p-6 md:hidden"
          >
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-pink-800 mb-4">Filters</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubcategory('all');
                    setIsFilterOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            {selectedCategory !== 'all' && subcategories.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
                <div className="space-y-2">
                  {subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                        selectedSubcategory === subcategory
                          ? 'bg-pink-600 text-white'
                          : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                      }`}
                      onClick={() => {
                        setSelectedSubcategory(subcategory);
                        setIsFilterOpen(false);
                        setCurrentPage(1);
                      }}
                    >
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 rounded-lg border border-pink-200"
                aria-label="Sort products"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => {
                  setPriceRange([0, parseInt(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="w-full"
                aria-label="Filter by price range"
              />
              <p className="text-sm text-gray-600">Up to ${priceRange[1]}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg sticky top-20">
            <h3 className="text-xl font-bold text-pink-800 mb-4">Filters</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubcategory('all');
                    setCurrentPage(1);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
            {selectedCategory !== 'all' && subcategories.length > 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
                <div className="space-y-2">
                  {subcategories.map((subcategory) => (
                    <motion.button
                      key={subcategory}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                        selectedSubcategory === subcategory
                          ? 'bg-pink-600 text-white'
                          : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                      }`}
                      onClick={() => {
                        setSelectedSubcategory(subcategory);
                        setCurrentPage(1);
                      }}
                    >
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 rounded-lg border border-pink-200"
                aria-label="Sort products"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => {
                  setPriceRange([0, parseInt(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="w-full"
                aria-label="Filter by price range"
              />
              <p className="text-sm text-gray-600">Up to ${priceRange[1]}</p>
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-grow">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                {initialCategory && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                    aria-label="Back to categories"
                  >
                    <ArrowLeft size={20} />
                  </motion.button>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-pink-800">
                  {selectedCategory === 'all' 
                    ? 'Explore Our Makeup Collection' 
                    : `Explore ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`}
                </h1>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full p-3 pl-10 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/90"
                  aria-label="Search products"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              {selectedCategory === 'all' 
                ? 'Discover your perfect beauty essentials' 
                : `Browse our curated ${selectedCategory} products`}
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[...Array(productsPerPage)].map((_, index) => (
                <ShimmerCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg bg-white/80 p-6 rounded-2xl shadow-md">
              {error}
              <button
                onClick={() => setRetryCount(prev => prev + 1)}
                className="ml-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                aria-label="Retry loading products"
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 text-lg bg-white/80 p-6 rounded-2xl shadow-md">
              No products found.
              <button
                onClick={() => setRetryCount(prev => prev + 1)}
                className="ml-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                aria-label="Refresh products"
              >
                Refresh
              </button>
            </div>
          ) : (
            <>
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </AnimatePresence>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        currentPage === index + 1
                          ? 'bg-pink-600 text-white'
                          : 'bg-white text-pink-600 hover:bg-pink-100'
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                      aria-label={`Go to page ${index + 1}`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pink-600 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm">© 2025 Skin Makeup. All rights reserved.</p>
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

export default CategoriesPage;