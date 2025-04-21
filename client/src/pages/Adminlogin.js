
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate async login (replace with your API call)
    setTimeout(() => {
      if (username === 'taruna' || password === '123456') {
        setError('Please fill in all fields');
        setIsLoading(false);
        navigate('/admindashboard');
        return;
      }
      // Add your authentication logic here (e.g., API call)
      console.log('Login attempted with:', { username, password });
      setIsLoading(false);
      // Example: Redirect to /admin on success
      // Use useNavigate from react-router-dom
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 p-4 overflow-hidden">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-lg animate-fade-in">
        {/* Left Side: Image Section */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-rose-600 to-rose-800 relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Store Background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 flex flex-col items-center justify-center p-8 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <svg
                className="w-12 h-12 text-rose-200 hover:text-white transition-all duration-500 transform hover:rotate-45"
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
              <span className="text-3xl font-bold bg-gradient-to-r from-rose-100 to-white bg-clip-text text-transparent font-serif tracking-tight">
                Admin Portal
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-rose-100 text-center">
              Manage Your Store with Ease
            </h2>
            <p className="mt-4 text-rose-200 text-center max-w-sm">
              Securely access your admin dashboard to oversee products, users, and queries.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white/70 backdrop-blur-md">
          <div className="lg:hidden flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-rose-600 hover:text-rose-700 transition-all duration-500 transform hover:rotate-45"
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
            <span className="ml-2 text-2xl font-bold text-rose-600 font-serif tracking-tight">
              Admin Portal
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">
            Admin Sign In
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-rose-100 text-rose-600 rounded-lg text-sm text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative animate-slide-up delay-100">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-300/50 focus:border-rose-500 transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="relative animate-slide-up delay-200">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-300/50 focus:border-rose-500 transition-all duration-300 shadow-sm hover:shadow-md pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-rose-600 hover:text-rose-700 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 rounded-lg font-medium text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isLoading
                  ? 'bg-rose-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              to="/forgot-password"
              className="block text-sm text-rose-600 hover:text-rose-700 transition-colors duration-200 hover:underline"
            >
              Forgot Password?
            </Link>
            <p className="text-sm text-gray-500">
              Not an admin?{' '}
              <Link
                to="/"
                className="text-rose-600 hover:text-rose-700 transition-colors duration-200 hover:underline"
              >
                Return to Store
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Tailwind Animation Classes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
