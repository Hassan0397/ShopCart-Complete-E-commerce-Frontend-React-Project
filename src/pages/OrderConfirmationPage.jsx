import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const order = state?.order;
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Clear cart on component mount
  useEffect(() => {
    if (!order) {
      navigate('/products');
      return;
    }
    clearCart();
  }, [order, navigate, clearCart]);

  const handleTrackPackage = () => {
    if (!order?.trackingNumber) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockStatuses = ['Order Processed', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered'];
      const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
      
      setTrackingInfo({
        status: randomStatus,
        location: randomStatus === 'Delivered' ? 'Your Address' : 'Distribution Center',
        lastUpdated: new Date().toLocaleString()
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // In a real app, you would send this to your backend
      console.log('Subscribed email:', email);
      setEmail('');
    }
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find your order details.</p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Format delivery date
  const estimatedDelivery = order.estimatedDelivery 
    ? new Date(order.estimatedDelivery).toLocaleDateString() 
    : 'Calculating...';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-center">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6 text-center">Thank you for your purchase. Your order is being processed.</p>
        
        {/* Order Summary Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">Order Number:</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Total:</p>
              <p className="font-medium">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Estimated Delivery:</p>
              <p className="font-medium">{estimatedDelivery}</p>
            </div>
          </div>
          
          {/* Items List */}
          <div className="mt-4">
            <h3 className="font-medium mb-2">Items Ordered:</h3>
            <ul className="space-y-2">
              {order.items.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.title} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tracking Section */}
          {order.trackingNumber && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Track Your Package</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={order.trackingNumber}
                  readOnly
                  className="flex-grow px-4 py-2 border rounded-lg bg-gray-100"
                />
                <button
                  onClick={handleTrackPackage}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg disabled:opacity-50"
                >
                  {isLoading ? <LoadingSpinner size="small" /> : 'Track'}
                </button>
              </div>
              
              {trackingInfo && (
                <div className="mt-4 p-4 bg-white border rounded-lg">
                  <h4 className="font-medium mb-2">Tracking Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Status:</span> <span className="font-medium">{trackingInfo.status}</span></p>
                    <p><span className="text-gray-600">Location:</span> <span className="font-medium">{trackingInfo.location}</span></p>
                    <p><span className="text-gray-600">Last Update:</span> <span className="font-medium">{trackingInfo.lastUpdated}</span></p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Email Subscription */}
        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Get Shipping Updates</h2>
            <p className="text-gray-600 mb-4">Enter your email to receive shipping notifications:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-lg"
                placeholder="Your email address"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
              >
                Subscribe
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-green-700">Thank you for subscribing to shipping updates!</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg text-center"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;