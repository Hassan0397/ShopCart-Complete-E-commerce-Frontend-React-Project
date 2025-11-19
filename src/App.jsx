// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { OrdersProvider } from './context/OrdersContext'; // Make sure this exists
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/account/OrderHistoryPage'; // Import the OrderHistoryPage
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <OrdersProvider> {/* Wrap with OrdersProvider */}
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-confirmation"
                      element={
                        <ProtectedRoute>
                          <OrderConfirmationPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute>
                          <AccountPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/account/orders"
                      element={
                        <ProtectedRoute>
                          <OrderHistoryPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<div>404 Not Found</div>} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </OrdersProvider>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;