import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const OrdersContext = createContext();

// Moved outside component to prevent recreation on every render
function isValidOrder(order) {
  return order && 
         typeof order === 'object' &&
         order.id && 
         order.date && 
         Array.isArray(order.items) && 
         typeof order.total === 'number';
}

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          console.log('Loaded orders from localStorage:', parsedOrders);
          
          if (Array.isArray(parsedOrders) && parsedOrders.every(isValidOrder)) {
            setOrders(parsedOrders);
          } else {
            console.warn('Invalid orders data in localStorage, resetting...');
            localStorage.removeItem('orders');
          }
        }
      } catch (err) {
        console.error('Failed to load orders from localStorage:', err);
        setError('Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []); // Empty dependency array is correct here - runs only once on mount

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (loading) return;
    
    try {
      console.log('Saving orders to localStorage:', orders);
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders to localStorage:', err);
      setError('Failed to save order history');
    }
  }, [orders, loading]);

  const addOrder = useCallback((order) => {
    try {
      console.log('Attempting to add order:', order);
      
      if (!isValidOrder(order)) {
        console.error('Invalid order structure:', order);
        throw new Error('Invalid order data');
      }

      setOrders(prev => {
        if (prev.some(o => o.id === order.id)) {
          console.warn('Duplicate order detected, not adding:', order.id);
          return prev;
        }

        const newOrders = [order, ...prev];
        console.log('Successfully added order. Updated orders:', newOrders);
        return newOrders;
      });

      return true;
    } catch (err) {
      console.error('Failed to add order:', err);
      setError('Failed to add order to history');
      return false;
    }
  }, []);

  const getOrderById = useCallback((orderId) => {
    const order = orders.find(order => order.id === orderId);
    console.log('Retrieving order by ID:', orderId, 'Found:', order);
    return order;
  }, [orders]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    console.log('Updating order status:', orderId, 'to', newStatus);
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  }, []);

  const cancelOrder = useCallback((orderId) => {
    console.log('Cancelling order:', orderId);
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  }, []);

  const clearOrders = useCallback(() => {
    console.log('Clearing all orders');
    setOrders([]);
    localStorage.removeItem('orders');
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    orders,
    loading,
    error,
    addOrder,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    clearOrders
  }), [orders, loading, error, addOrder, getOrderById, updateOrderStatus, cancelOrder, clearOrders]);

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};