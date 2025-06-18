import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuUser, LuLock, LuMail, LuEye, LuEyeOff, LuSparkles, LuHeart, LuDiamond, LuCheck } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const luxuryProducts = [
    {
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Luminous Night Elixir',
      description: 'Wake up to radiant, glowing skin'
    },
    {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Velvet Matte Lip Collection',
      description: 'Premium pigments for a flawless pout'
    },
    {
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      title: '24K Gold Serum',
      description: 'Luxury anti-aging treatment'
    }
  ];

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % luxuryProducts.length);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin 
        ? 'http://localhost:8080/api/auth/login' 
        : 'http://localhost:8080/api/auth/signup';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLogin 
          ? { email: formData.email, password: formData.password }
          : { name: formData.name, email: formData.email, password: formData.password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        
        if (isLogin) {
         navigate(`/user?email=${encodeURIComponent(formData.email)}`);// Navigate to home page only for login
        } else {
          // Show success popup for signup
          setShowSuccessPopup(true);
          // Reset form
          setFormData({
            email: '',
            password: '',
            name: ''
          });
        }
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/80 to-purple-50/80 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Success Popup */}
      {/* Success Popup */}
<AnimatePresence>
  {showSuccessPopup && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
      onClick={() => setShowSuccessPopup(false)}
    >
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <LuCheck className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h3>
          <p className="text-gray-600 mb-6">
            Welcome to Glamour Heaven! Your account has been successfully created. 
            Please sign in to access your beauty profile.
          </p>
          <button
            onClick={() => {
              setShowSuccessPopup(false);
              setIsLogin(true); // Switch to login form
            }}
            className="w-full bg-gradient-to-r from-rose-600 to-rose-500 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            Sign In Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      {/* Rest of your existing code remains the same */}
      {/* Floating luxury particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <LuDiamond />
          </motion.div>
        ))}
      </div>

      {/* Main container */}
      <motion.div 
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Luxury product showcase */}
        <div className="hidden lg:flex flex-col relative h-full min-h-[700px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10"></div>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={luxuryProducts[currentImageIndex].image}
                alt="Glamour Heaven Product"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Product info overlay */}
          <div className="relative z-20 p-12 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              >
                <h1 className="text-5xl font-bold text-white font-serif mb-2">GLAMOUR HEAVEN</h1>
                <div className="w-20 h-1 bg-rose-300 mb-6"></div>
                <p className="text-lg text-white/90">
                  {isLogin 
                    ? 'Your exclusive beauty membership awaits' 
                    : 'Join our circle of beauty connoisseurs'}
                </p>
              </motion.div>
              
              <div className="flex gap-2">
                {luxuryProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-rose-300 w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 max-w-md"
            >
              <h3 className="text-2xl font-medium text-white mb-1">{luxuryProducts[currentImageIndex].title}</h3>
              <p className="text-white/80 mb-4">{luxuryProducts[currentImageIndex].description}</p>
              <button className="text-rose-200 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                Discover this product <LuSparkles className="text-xs" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Auth section */}
        <div className="p-12 flex flex-col justify-center">
          {/* Auth header */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <LuHeart className="text-rose-500 text-xl" />
              </div>
              <h2 className="text-3xl font-medium text-gray-900">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
            </div>
            
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setIsLogin(true)}
                className={`pb-4 px-1 font-medium text-sm relative ${isLogin ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign In
                {isLogin && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                    layoutId="authIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`pb-4 px-1 font-medium text-sm ml-6 relative ${!isLogin ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign Up
                {!isLogin && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                    layoutId="authIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </motion.div>

          {/* Auth form */}
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LuUser className="text-gray-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-200 outline-none transition-all group-hover:border-rose-400 placeholder-gray-400"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LuMail className="text-gray-400 group-hover:text-rose-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-200 outline-none transition-all group-hover:border-rose-400 placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                {isLogin && (
                  <a href="#" className="text-xs font-medium text-rose-600 hover:text-rose-500 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LuLock className="text-gray-400 group-hover:text-rose-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-200 outline-none transition-all group-hover:border-rose-400 placeholder-gray-400"
                  placeholder={isLogin ? "Enter your password" : "Create your password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-rose-500 transition-colors"
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
              {!isLogin && (
                <div className="mt-3">
                  <div className="flex gap-2 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i < (formData.password.length > 12 ? 4 : formData.password.length > 8 ? 3 : formData.password.length > 5 ? 2 : formData.password.length > 0 ? 1 : 0) ? 'bg-rose-500' : 'bg-gray-200'}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {formData.password.length > 0 ? (
                      <span className={formData.password.length > 8 ? 'text-green-600' : 'text-amber-600'}>
                        {formData.password.length > 12 ? 'Excellent security' :
                         formData.password.length > 8 ? 'Strong password' :
                         formData.password.length > 5 ? 'Good start' : 'Too short'}
                      </span>
                    ) : 'Minimum 8 characters required'}
                  </p>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember this device
                </label>
              </div>
            )}

            <motion.button
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.3)"
              }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-rose-500 text-white py-4 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <LuSparkles className="text-sm" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-rose-700 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.form>

          {/* Social auth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Google', 'Apple', 'Facebook'].map((provider, i) => (
                <motion.button
                  key={provider}
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <span className="sr-only">Sign in with {provider}</span>
                  <img 
                    src={`https://logo.clearbit.com/${provider.toLowerCase()}.com`} 
                    alt={provider} 
                    className="h-5 w-5"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/20/cccccc/ffffff?text=${provider.charAt(0)}`;
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Auth footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-6 border-t border-gray-100"
          >
            <p className="text-center text-sm text-gray-500">
              {isLogin ? (
                <>
                  New to Glamour Heaven?{' '}
                  <button
                    onClick={toggleAuthMode}
                    className="font-medium text-rose-600 hover:text-rose-500 transition-colors"
                  >
                    Join our beauty collective
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={toggleAuthMode}
                    className="font-medium text-rose-600 hover:text-rose-500 transition-colors"
                  >
                    Access your beauty profile
                  </button>
                </>
              )}
            </p>
            <p className="text-center text-xs text-gray-400 mt-4">
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-gray-600">Terms</a> and{' '}
              <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;