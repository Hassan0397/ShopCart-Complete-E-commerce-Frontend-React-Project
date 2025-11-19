import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../../context/OrdersContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't find an order with that ID
        </p>
        <Link
          to="/account/orders"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Back to Order History
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'shipped': return <FiTruck className="text-purple-500" />;
      case 'delivered': return <FiCheckCircle className="text-green-500" />;
      case 'cancelled': return <FiXCircle className="text-red-500" />;
      default: return <FiClock className="text-blue-500" />;
    }
  };

  const getStatusSteps = (status) => {
    const steps = [
      { id: 'processing', name: 'Processing', status: 'complete' },
      { id: 'shipped', name: 'Shipped', status: status === 'processing' ? 'pending' : status === 'shipped' || status === 'delivered' ? 'complete' : 'pending' },
      { id: 'delivered', name: 'Delivered', status: status === 'delivered' ? 'complete' : 'pending' }
    ];

    if (status === 'cancelled') {
      steps.forEach(step => {
        if (step.id !== 'processing') step.status = 'cancelled';
      });
    }

    return steps;
  };

  const statusSteps = getStatusSteps(order.status);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Link 
          to="/account/orders" 
          className="text-primary hover:underline"
        >
          Back to Order History
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold">Order #{order.id}</h2>
              <p className="text-gray-600">
                Placed on {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-2 capitalize">{order.status}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-4">Tracking</h3>
          <div className="px-4 py-6">
            <div className="flex items-center">
              {statusSteps.map((step, stepIdx) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === 'complete' ? 'bg-green-100 text-green-800' :
                    step.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {step.status === 'complete' ? (
                      <FiCheckCircle className="h-5 w-5" />
                    ) : step.status === 'cancelled' ? (
                      <FiXCircle className="h-5 w-5" />
                    ) : (
                      <span className="h-5 w-5 flex items-center justify-center">
                        {stepIdx + 1}
                      </span>
                    )}
                  </div>
                  <div className={`ml-3 text-sm font-medium ${
                    step.status === 'complete' ? 'text-green-800' :
                    step.status === 'cancelled' ? 'text-red-800' :
                    'text-gray-800'
                  }`}>
                    {step.name}
                  </div>
                  {stepIdx !== statusSteps.length - 1 && (
                    <div className="flex-auto border-t-2 border-gray-200 mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              </p>
              <p className="text-gray-600 mt-1">{order.shippingInfo.address}</p>
              <p className="text-gray-600">
                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
              </p>
              <p className="text-gray-600">{order.shippingInfo.country}</p>
              <p className="text-gray-600 mt-2">Phone: {order.shippingInfo.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Payment Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium capitalize">
                {order.paymentMethod === 'creditCard' ? 'Credit Card' : order.paymentMethod}
              </p>
              <p className="text-gray-600 mt-2">
                Status: <span className="capitalize">Paid</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">Order Items</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <div key={item.id} className="p-6 flex">
              <div className="flex-shrink-0 w-20 h-20">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;