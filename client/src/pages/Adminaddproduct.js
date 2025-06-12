import { useState } from 'react';
import { FiUpload, FiPlus, FiX, FiChevronDown } from 'react-icons/fi';

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    quantity: ''
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Array for multiple images
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (imagePreviews.length + files.length > 3) {
      setError('Maximum of 3 images allowed');
      return;
    }

    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    URL.revokeObjectURL(updatedPreviews[index].preview);
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (!product.title || !product.price || !product.category || !product.subcategory || !product.quantity) {
      setError('Title, price, category, subcategory, and quantity are required');
      setIsLoading(false);
      return;
    }

    if (!categories.includes(product.category)) {
      setError('Invalid category selected');
      setIsLoading(false);
      return;
    }

    if (imagePreviews.length === 0) {
      setError('At least one product image is required');
      setIsLoading(false);
      return;
    }

    const parsedQuantity = parseInt(product.quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      setError('Quantity must be a non-negative number');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('subcategory', product.subcategory);
      formData.append('quantity', product.quantity);
      imagePreviews.forEach((image) => {
        formData.append('images', image.file); // Use 'images' field name for multiple files
      });

      const response = await fetch('http://localhost:8080/api/products/add1', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      const result = await response.json();
      setSuccess(true);
      
      // Reset form
      setProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        quantity: ''
      });
      imagePreviews.forEach(image => URL.revokeObjectURL(image.preview));
      setImagePreviews([]);
      
    } catch (err) {
      setError(err.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-2 animate-fade-in-down">
            Add New Product
          </h1>
          <p className="text-lg text-rose-500/90 animate-fade-in-down delay-100">
            Expand your beauty collection with premium products
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 mx-auto rounded-full animate-scale-x origin-left"></div>
        </div>

        {/* Glass Card Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/30 transform transition-all duration-500 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Status Messages */}
            {error && (
              <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-shake">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {success && (
              <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Product added successfully!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-rose-700/90">
                  Product Title <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    required
                    className="block w-full px-5 py-3.5 rounded-xl border-0 bg-white/90 shadow-sm ring-1 ring-inset ring-rose-200/70 placeholder:text-rose-300/80 focus:ring-2 focus:ring-inset focus:ring-rose-500/90 transition-all duration-300 hover:ring-rose-300 focus:shadow-md"
                    placeholder="Enter product title"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-rose-700/90">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-5 py-3.5 rounded-xl border-0 bg-white/90 shadow-sm ring-1 ring-inset ring-rose-200/70 placeholder:text-rose-300/80 focus:ring-2 focus:ring-inset focus:ring-rose-500/90 transition-all duration-300 hover:ring-rose-300 focus:shadow-md"
                  placeholder="Describe your product in detail..."
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-rose-700/90">
                  Price (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-rose-400/90 text-lg">₹</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="block w-full pl-12 pr-5 py-3.5 rounded-xl border-0 bg-white/90 shadow-sm ring-1 ring-inset ring-rose-200/70 placeholder:text-rose-300/80 focus:ring-2 focus:ring-inset focus:ring-rose-500/90 transition-all duration-300 hover:ring-rose-300 focus:shadow-md"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-rose-700/90">
                  Quantity <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                    className="block w-full px-5 py-3.5 rounded-xl border-0 bg-white/90 shadow-sm ring-1 ring-inset ring-rose-200/70 placeholder:text-rose-300/80 focus:ring-2 focus:ring-inset focus:ring-rose-500/90 transition-all duration-300 hover:ring-rose-300 focus:shadow-md"
                    placeholder="Enter quantity"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-rose-700/90">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-5 py-3.5 pr-10 rounded-xl border-0 bg-white/90 shadow-sm ring-1 ring-inset ring-rose-200/70 placeholder:text-rose-300/80 focus:ring-2 focus:ring-inset focus:ring-rose-500/90 transition-all duration-300 hover:ring-rose-300 focus:shadow-md"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <FiChevronDown className="h-5 w-5 text-rose-400/90" />
                  </div>
                </div>
              </div>

              {/* Subcategory Input */}
              <div className="space-y-2">
                <label htmlFor="subcategory" className="block text-sm font-medium text-rose-700/90">
                  Subcategory <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={product.subcategory}
                    onChange={handleChange}
                    required
                    className="block w-full px-5 py-3.5 rounded-xl border-0 bg-white/90 shadow-sm ring-1 ring-inset ring-rose-200/70 placeholder:text-rose-300/80 focus:ring-2 focus:ring-inset focus:ring-rose-500/90 transition-all duration-300 hover:ring-rose-300 focus:shadow-md"
                    placeholder="e.g., Shampoo, Foundation"
                  />
                </div>
                <p className="mt-2 text-xs text-rose-400/80">
                  Enter the specific product type (e.g., Shampoo for Hair)
                </p>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-rose-700/90">
                  Product Images (up to 3) <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-6">
                  {imagePreviews.map((image, index) => (
                    <div key={index} className="relative group transition-all duration-500 hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-rose-100/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-36 w-36 object-cover rounded-xl border-2 border-white shadow-lg ring-2 ring-rose-200/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-md text-rose-600 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-50 hover:scale-110"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < 3 && (
                    <label className="flex flex-col items-center justify-center w-36 h-36 rounded-xl border-2 border-dashed border-rose-300/70 hover:border-rose-400 cursor-pointer transition-all duration-500 hover:bg-white/50 group">
                      <div className="flex flex-col items-center justify-center pt-6 pb-7">
                        <div className="p-3 bg-rose-100/50 rounded-full mb-3 group-hover:bg-rose-200/50 transition-colors duration-300">
                          <FiPlus className="w-6 h-6 text-rose-500 group-hover:text-rose-600 transition-colors duration-300" />
                        </div>
                        <p className="mb-2 text-sm text-rose-500/90 group-hover:text-rose-600 transition-colors duration-300">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-rose-400/80 group-hover:text-rose-500/90 transition-colors duration-300">
                          PNG, JPG, JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`relative overflow-hidden px-10 py-4 rounded-xl font-medium text-white shadow-lg transition-all duration-500 group ${
                  isLoading
                    ? 'bg-rose-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload className="transition-transform duration-300 group-hover:translate-y-0.5" />
                      <span>Add Product</span>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;