import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiPlus, FiUsers, FiInbox, FiSettings, FiPieChart, FiLogOut, FiChevronLeft, FiChevronRight, FiMenu } from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: <FiHome className="w-5 h-5" />, path: '/admin' },
    { name: 'Add Product', icon: <FiPlus className="w-5 h-5" />, path: '/admin/add-product' },
    { name: 'Products', icon: <FiPieChart className="w-5 h-5" />, path: '/admin/products' },
    { name: 'Users', icon: <FiUsers className="w-5 h-5" />, path: '/admin/users' },
    { name: 'Queries', icon: <FiInbox className="w-5 h-5" />, path: '/admin/queries' },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5" />, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-rose-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-rose-500 to-rose-600 text-white transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          ${isMobile && !sidebarOpen ? 'hidden' : 'fixed md:relative z-40'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-rose-400/30">
            {sidebarOpen ? (
              <Link to="/admin" className="flex items-center space-x-2 group">
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
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold bg-gradient-to-r from-rose-100 to-white bg-clip-text text-transparent font-serif tracking-tight">
                    ADMIN
                  </span>
                </div>
              </Link>
            ) : (
              <Link to="/admin" className="flex justify-center w-full">
                <svg 
                  className="w-8 h-8 text-rose-200 hover:text-white transition-all duration-500 hover:rotate-45"
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
              </Link>
            )}
            
            <button 
              onClick={toggleSidebar}
              className="hidden md:flex items-center justify-center p-1 rounded-full hover:bg-rose-400/30 transition-colors duration-200"
            >
              {sidebarOpen ? (
                <FiChevronLeft className="w-5 h-5 text-rose-100 hover:text-white" />
              ) : (
                <FiChevronRight className="w-5 h-5 text-rose-100 hover:text-white" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setActiveItem(item.name.toLowerCase())}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 group
                      ${activeItem === item.name.toLowerCase() 
                        ? 'bg-white/20 text-white font-medium' 
                        : 'text-rose-100 hover:bg-white/10 hover:text-white'}
                      ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center'}`}
                  >
                    <span className={`transition-colors duration-200 ${activeItem === item.name.toLowerCase() ? 'text-white' : 'text-rose-100 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    {sidebarOpen && (
                      <span className="flex-1 whitespace-nowrap">{item.name}</span>
                    )}
                    {sidebarOpen && activeItem === item.name.toLowerCase() && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout/Settings */}
          <div className="p-4 border-t border-rose-400/30">
            <Link
              to="/logout"
              className={`flex items-center p-3 rounded-lg transition-all duration-200 group
                ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center'}
                text-rose-100 hover:bg-white/10 hover:text-white`}
            >
              <FiLogOut className="w-5 h-5" />
              {sidebarOpen && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="md:hidden mr-4 p-2 rounded-md text-rose-600 hover:bg-rose-100 transition-colors duration-200"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-rose-600 capitalize">
                {activeItem === 'dashboard' ? 'Admin Dashboard' : activeItem}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors duration-200 relative">
                  <FiInbox className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">3</span>
                </button>
              </div>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-rose-400 to-rose-600 flex items-center justify-center text-white font-semibold">
                    AD
                  </div>
                  {sidebarOpen && (
                    <span className="text-gray-700 group-hover:text-rose-600 transition-colors duration-200">
                      Admin
                    </span>
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                  <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200">
                    Profile
                  </Link>
                  <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200">
                    Settings
                  </Link>
                  <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-rose-50 to-rose-100">
          <div className="max-w-7xl mx-auto w-full">
            {/* Welcome Banner */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 shadow-lg overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/20 rounded-full"></div>
                <div className="relative z-10">
                  <h1 className="text-3xl font-bold text-white">Welcome back, Admin!</h1>
                  <p className="text-rose-100 mt-2 max-w-lg">
                    Here's what's happening with your store today. You have 12 new orders and 3 customer messages waiting.
                  </p>
                  <button className="mt-4 bg-white text-rose-600 px-6 py-2 rounded-full font-medium hover:bg-rose-50 transition-all duration-200 shadow-md hover:shadow-lg">
                    View Recent Activity
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Products */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Products</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">1,248</p>
                      <p className="text-sm text-rose-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +12.5% from last month
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <FiPieChart className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500" 
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Total Users */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">5,342</p>
                      <p className="text-sm text-rose-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +24.3% from last month
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <FiUsers className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500" 
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pending Queries */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Queries</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
                      <p className="text-sm text-rose-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                        </svg>
                        -5 from yesterday
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <FiInbox className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500" 
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Revenue */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenue</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">$24,780</p>
                      <p className="text-sm text-rose-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +18.7% from last month
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500" 
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                    <Link to="/admin/orders" className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((order) => (
                      <div key={order} className="flex items-center p-3 hover:bg-rose-50 rounded-lg transition-colors duration-200">
                        <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                          #{order + 1042}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-900">Customer {order}</p>
                          <p className="text-sm text-gray-500">${(120 + order * 25).toFixed(2)} • {['Processing', 'Shipped', 'Delivered'][order % 3]}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(Date.now() - order * 86400000).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      to="/admin/add-product" 
                      className="p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors duration-200 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
                        <FiPlus className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">Add Product</span>
                    </Link>
                    
                    <Link 
                      to="/admin/users" 
                      className="p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors duration-200 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
                        <FiUsers className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">Manage Users</span>
                    </Link>
                    
                    <Link 
                      to="/admin/queries" 
                      className="p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors duration-200 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
                        <FiInbox className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">Customer Queries</span>
                    </Link>
                    
                    <Link 
                      to="/admin/settings" 
                      className="p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors duration-200 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
                        <FiSettings className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">Settings</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 mb-8">
              <Outlet />
            </div>
          </div>
        </main>    
      </div>
    </div>
  );
};

export default AdminDashboard;