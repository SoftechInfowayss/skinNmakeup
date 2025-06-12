import { useState, useEffect } from 'react';
import { FiPackage, FiTrash2 } from 'react-icons/fi';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/all1');
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch products');
        }
        const productsArray = Array.isArray(data.products) ? data.products : [];
        setProducts(productsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete product');
      }
      // Update the product list by filtering out the deleted product
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-center space-x-3">
          <FiPackage className="w-8 h-8 text-rose-200" />
          <div>
            <h2 className="text-2xl font-bold">Manage Products</h2>
            <p className="text-rose-100">View all products in your inventory</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-rose-600 text-lg font-medium">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-full font-medium hover:bg-rose-700 transition-all duration-200"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-rose-200">
                <thead className="bg-rose-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider min-w-[200px]">Images</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Subcategory</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Added On</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-rose-200">
                  {products.map((product) => {
                    // Handle both old schema (image) and new schema (images)
                    let imageSrcs = [];
                    if (product.images && Array.isArray(product.images)) {
                      // New schema: images array
                      imageSrcs = product.images
                        .map(image => 
                          image && image.data
                            ? `data:${image.contentType};base64,${image.data}`
                            : null
                        )
                        .filter(src => src !== null);
                    } else if (product.image && product.image.data) {
                      // Old schema: single image field
                      imageSrcs = [`data:${product.image.contentType};base64,${product.image.data}`];
                    }

                    return (
                      <tr key={product.id} className="hover:bg-rose-50 transition-all duration-200">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{product.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">${product.price?.toFixed(2) || '0.00'}</td>
                        <td className="px-6 py-4 text-sm">
                          {imageSrcs.length > 0 ? (
                            <div className="flex space-x-2">
                              {imageSrcs.map((src, index) => (
                                <img
                                  key={index}
                                  src={src}
                                  alt={`product-${index}`}
                                  className="h-12 w-12 object-cover rounded"
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">No images</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.subcategory}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.quantity || 0}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.createdAt ? formatDate(product.createdAt) : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-rose-600 hover:text-rose-800 transition-all duration-200"
                            title="Delete Product"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;