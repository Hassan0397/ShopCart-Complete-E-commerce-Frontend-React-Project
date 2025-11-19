import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import OrderSummary from '../../components/checkout/OrderSummary';

const ShippingPage = () => {
  const { shippingInfo, updateShippingInfo } = useCheckout();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateShippingInfo({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout/payment');
  };

  if (cartCount === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <div className="flex-1 border-t-2 border-primary pt-1">
          <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            1
          </span>
        </div>
        <div className="px-2 text-sm text-gray-500">Shipping</div>
        <div className="flex-1 border-t-2 border-gray-300 pt-1">
          <span className="bg-gray-300 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            2
          </span>
        </div>
        <div className="px-2 text-sm text-gray-500">Payment</div>
        <div className="flex-1 border-t-2 border-gray-300 pt-1">
          <span className="bg-gray-300 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
        
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;