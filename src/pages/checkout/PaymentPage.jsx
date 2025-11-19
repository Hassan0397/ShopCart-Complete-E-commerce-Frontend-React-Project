import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import OrderSummary from '../../components/checkout/OrderSummary';

const PaymentPage = () => {
  const { paymentMethod, setPaymentMethod, orderNotes, setOrderNotes, shippingInfo } = useCheckout();
  const { cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartCount === 0) {
      navigate('/cart');
    }
  }, [cartCount, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process payment here
    clearCart();
    navigate('/checkout/confirmation');
  };

  // Basic validation - in a real app, you'd want more thorough validation
  const isFormValid = Object.values(shippingInfo).every(value => value.trim() !== '');

  if (cartCount === 0) {
    return null; // Return null while redirect happens
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
        <div className="flex-1 border-t-2 border-primary pt-1">
          <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            2
          </span>
        </div>
        <div className="px-2 text-sm text-primary font-medium">Payment</div>
        <div className="flex-1 border-t-2 border-gray-300 pt-1">
          <span className="bg-gray-300 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => setPaymentMethod('creditCard')}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                  Credit Card
                </label>
              </div>
              
              {paymentMethod === 'creditCard' && (
                <div className="ml-7 space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                  PayPal
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                id="orderNotes"
                name="orderNotes"
                rows="3"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Special instructions, delivery notes, etc."
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors ${
                  !isFormValid ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                Complete Order
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

export default PaymentPage;