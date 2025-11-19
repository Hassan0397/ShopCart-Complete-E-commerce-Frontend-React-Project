import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';

const ConfirmationPage = () => {
  const { shippingInfo, paymentMethod } = useCheckout();
  const { cart, cartTotal } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();

  // Generate order details
  const orderNumber = `ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toISOString();

  // Save order when component mounts
  useEffect(() => {
    const order = {
      id: orderNumber,
      date: orderDate,
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.thumbnail,
        productId: item.id // For future reference
      })),
      total: cartTotal,
      shippingInfo: {
        ...shippingInfo,
        email: user?.email || shippingInfo.email // Include user email if available
      },
      paymentMethod,
      status: 'processing', // processing, shipped, delivered, cancelled
      userId: user?.id || null // Link to user account if logged in
    };
    
    addOrder(order);
    
    // Clear cart after order is saved (optional)
    // clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase, {user?.name || 'Customer'}!
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(orderDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium capitalize">
                {paymentMethod === 'creditCard' ? 'Credit Card' : paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping To:</span>
              <span className="font-medium text-right">
                {shippingInfo.firstName} {shippingInfo.lastName}<br />
                {shippingInfo.address}<br />
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                {shippingInfo.country}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account/orders"
            className="px-6 py-2 bg-white border border-gray-300 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;