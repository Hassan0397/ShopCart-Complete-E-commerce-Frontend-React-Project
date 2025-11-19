// src/pages/AccountPage.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const AccountPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Order History</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Link
                    to="/account/orders"
                    className="w-full text-left py-2 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex justify-between items-center"
                  >
                    <span>View your order history</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Account Security</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <button className="w-full text-left py-2 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                    Change Password
                  </button>
                  <button className="w-full text-left py-2 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                    Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
              <button
                onClick={logout}
                className="w-full py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;