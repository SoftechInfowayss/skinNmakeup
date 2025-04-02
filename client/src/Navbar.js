import { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = ["Home" ,"Categories", "About Us", "Contact Us"];

  return (
    <nav className="bg-gradient-to-r from-rose-400 to-rose-600 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo - Changed to white for contrast */}
          <div className="flex-shrink-0 flex items-center space-x-2 group">
  {/* Animated Diamond Icon */}
  <div className="relative">
    <svg 
      className="w-8 h-8 text-rose-200 group-hover:text-white transition-all duration-500 transform group-hover:rotate-45"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M12 6l8 8-8 8-8-8 8-8z"
      />
    </svg>
    <div className="absolute inset-0 rounded-full border-2 border-rose-200/30 group-hover:border-rose-100/50 pointer-events-none animate-pulse"></div>
  </div>

  {/* Text with Gradient */}
  <div className="flex flex-col leading-tight">
    <span className="text-2xl font-bold bg-gradient-to-r from-rose-100 to-white bg-clip-text text-transparent font-serif tracking-tight drop-shadow-md">
      GLAMOUR
    </span>
    <span className="text-xl font-light bg-gradient-to-r from-rose-200/90 to-rose-100 bg-clip-text text-transparent font-serif tracking-widest">
      HAVEN
    </span>
  </div>

  {/* Glow Effect */}
  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-rose-400/10 blur-md transition-opacity duration-300 pointer-events-none"></div>
</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Navigation Items - White text with subtle hover effect */}
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="text-white hover:text-white/90 px-2 py-2 font-medium text-sm uppercase tracking-wider transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Right side elements */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar - With glass morphism effect */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-64 pl-10 pr-4 py-2 border border-white/30 rounded-full bg-white/20 backdrop-blur-sm placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 text-white"
                placeholder="Search products..."
              />
            </div>

            {/* Icons - White with subtle glow */}
            <div className="flex items-center space-x-5 ml-4">
              <a href="#" className="text-white hover:text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 relative">
                <FiHeart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
                <span className="absolute -top-1 -right-1 bg-white text-rose-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
              <a href="#" className="text-white hover:text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 relative">
                <FiShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 bg-white text-rose-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">5</span>
              </a>
              <a href="#" className="text-white hover:text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                <FiUser className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/90 hover:bg-white/20 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - With matching pink background */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-rose-500 to-rose-600 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-white/30 rounded-full bg-white/20 backdrop-blur-sm placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white"
                placeholder="Search products..."
              />
            </div>
            
            {/* Mobile Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-3 rounded-md text-sm font-medium text-white hover:text-white/90 hover:bg-white/20 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Mobile Icons */}
            <div className="flex justify-around pt-4 border-t border-white/20">
              <a href="#" className="text-white hover:text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 relative">
                <FiHeart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
                <span className="absolute -top-1 -right-1 bg-white text-rose-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
              <a href="#" className="text-white hover:text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 relative">
                <FiShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 bg-white text-rose-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">5</span>
              </a>
              <a href="#" className="text-white hover:text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                <FiUser className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </a>
            </div>
          </div>
        </div>
      )}
     
    </nav>
  );
};

export default Navbar;