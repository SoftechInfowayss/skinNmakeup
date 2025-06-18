import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, LogOut, Settings, Home, ChevronRight, Edit, Save, X } from 'lucide-react';

const UserDashboard = () => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || 'user@example.com';
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch user details
      const userResponse = await axios.get(`http://localhost:8080/api/auth/byemail/${email}`);
      setUser(userResponse.data.user);
      setFormData({
        name: userResponse.data.user.name,
        email: userResponse.data.user.email
      });

      // Fetch orders
    //   const ordersResponse = await axios.get(`http://localhost:8080/api/orders/${email}`);
    //   setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []);

    //   // Fetch wishlist
    //   const wishlistResponse = await axios.get(`http://localhost:8080/api/wishlist/${email}`);
    //   setWishlist(Array.isArray(wishlistResponse.data) ? wishlistResponse.data : []);

      // Fetch all products to match wishlist
    //   const productsResponse = await axios.get('http://localhost:8080/api/products/all1');
    //   setProducts(Array.isArray(productsResponse.data.products) ? productsResponse.data.products : []);

      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [email]);

  const wishlistProducts = wishlist
    .map(wishlistItem => products.find(product => product.id === wishlistItem.productId))
    .filter(product => product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/auth/update/${user.id}`, formData);
      setUser(response.data.user);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm animate-pulse border border-gray-100 dark:border-gray-700">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );

  const OrderStatusBadge = ({ status }) => {
    const statusColors = {
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
        {status || 'processing'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Modern minimalist header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">SkinMakeup</span>
          </a>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <a href="/" className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <Home size={18} className="mr-1" />
                Home
              </a>
              <button className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <LogOut size={18} className="mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <a href="/" className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <Home size={18} className="mr-2" />
                Home
              </a>
              <button className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <a href="/" className="hover:text-pink-600 dark:hover:text-pink-400">Home</a>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-pink-600 dark:text-pink-400">Dashboard</span>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user?.name || 'User'}! Here's what's happening with your account.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center transition-colors"
            >
              <Settings size={18} className="mr-2" />
              Account Settings
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3 mb-6 p-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {[
                  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'profile', label: 'Profile', icon: User },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === 'profile') setEditMode(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-pink-50 dark:bg-gray-700 text-pink-600 dark:text-pink-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon size={20} className="flex-shrink-0" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="ml-auto w-1 h-6 bg-pink-600 dark:bg-pink-400 rounded-full"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{orders.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Wishlist Items</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{wishlistProducts.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('default', { month: 'short', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</div>
                <button
                  onClick={fetchData}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order History</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          View and manage your recent orders
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                        View All Orders
                      </button>
                    </div>
                    
                    {orders.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <ShoppingBag size={40} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No orders yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Your order history will appear here</p>
                        <a
                          href="/products"
                          className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                        >
                          Start Shopping
                        </a>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {orders.slice(0, 5).map(order => (
                          <div key={order.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  Order #{order.id}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {new Date(order.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex flex-col sm:items-end gap-2">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                  ${order.total?.toFixed(2) || '0.00'}
                                </p>
                                <OrderStatusBadge status={order.status} />
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Wishlist</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {wishlistProducts.length} items saved for later
                      </p>
                    </div>
                    
                    {wishlistProducts.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <Heart size={40} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Your wishlist is empty</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Save items you love for easy access later</p>
                        <a
                          href="/products"
                          className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                        >
                          Browse Products
                        </a>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {wishlistProducts.map(product => (
                          <motion.div
                            key={product.id}
                            whileHover={{ y: -5 }}
                            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={
                                  product.image?.data && product.image?.contentType
                                    ? `data:${product.image.contentType};base64,${
                                        typeof product.image.data === 'string'
                                          ? product.image.data
                                          : btoa(String.fromCharCode(...new Uint8Array(product.image.data)))
                                      }`
                                    : 'https://via.placeholder.com/300x300?text=No+Image'
                                }
                                alt={product.title || 'Product Image'}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
                                }}
                              />
                              <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors">
                                <Heart size={18} className="text-pink-600 fill-pink-600" />
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                                {product.title || 'Untitled Product'}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                                {product.description || 'No description available.'}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">
                                  ${product.price ? product.price.toFixed(2) : '0.00'}
                                </span>
                                <button className="px-3 py-1.5 text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Manage your account details and preferences
                        </p>
                      </div>
                      {!editMode ? (
                        <button 
                          onClick={() => setEditMode(true)}
                          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center transition-colors"
                        >
                          <Edit size={18} className="mr-2" />
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditMode(false)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg flex items-center transition-colors"
                          >
                            <X size={18} className="mr-2" />
                            Cancel
                          </button>
                          <button 
                            onClick={handleProfileUpdate}
                            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center transition-colors"
                          >
                            <Save size={18} className="mr-2" />
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      {user ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                              {editMode ? (
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                              ) : (
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                  {user.name || 'Not provided'}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                              {editMode ? (
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                              ) : (
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                  {user.email}
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Member Since</label>
                              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }) : 'N/A'}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            {editMode && (
                              <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Change Avatar
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No profile data available.</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">SkinMakeup</a>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Premium beauty products for your skincare routine
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">About</a>
              <a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Contact</a>
              <a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Privacy</a>
              <a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SkinMakeup. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;