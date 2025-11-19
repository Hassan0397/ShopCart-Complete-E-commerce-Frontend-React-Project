import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart
  } = useCart();

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({cartCount} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {cart.map(item => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                <div className="flex p-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <Link
                        to={`/products/${item.id}`}
                        className="font-medium text-gray-800 hover:text-primary"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-1">{item.brand}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-lg font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <FiTrash2 className="mr-1" />
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="block w-full bg-primary hover:bg-primary-dark text-white text-center font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            <Link
              to="/products"
              className="block mt-4 text-center text-primary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;