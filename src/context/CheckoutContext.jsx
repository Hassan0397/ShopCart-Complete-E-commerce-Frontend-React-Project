import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderNotes, setOrderNotes] = useState('');

  const updateShippingInfo = (data) => {
    setShippingInfo(prev => ({ ...prev, ...data }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingInfo,
        paymentMethod,
        orderNotes,
        updateShippingInfo,
        setPaymentMethod,
        setOrderNotes
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};