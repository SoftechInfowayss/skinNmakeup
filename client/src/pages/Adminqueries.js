import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

const Adminqueries = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/getcontact');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch contacts');
        }

        setContacts(data.contacts || data.data); // Adjust based on your API response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-center space-x-3">
          <FiMail className="w-8 h-8 text-rose-200" />
          <div>
            <h2 className="text-2xl font-bold">Manage Contacts</h2>
            <p className="text-rose-100">View all contact inquiries from your platform</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
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
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No contacts found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-rose-200">
                <thead className="bg-rose-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-rose-600 uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-rose-200">
                  {contacts.map((contact, index) => (
                    <tr
                      key={index}
                      className="hover:bg-rose-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contact.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {contact.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {contact.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminqueries;
