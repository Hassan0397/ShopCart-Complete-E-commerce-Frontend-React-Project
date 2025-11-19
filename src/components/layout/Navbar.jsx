import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = ({ onCategorySelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const categories = [
    { 
      id: 1, 
      name: 'Electronics', 
      subcategories: [
        { name: 'Phones', category: 'smartphones' },
        { name: 'Laptops', category: 'laptops' },
        { name: 'Accessories', category: 'electronics' }
      ] 
    },
    { 
      id: 2, 
      name: 'Fashion', 
      subcategories: [
        { name: 'Men', category: 'mens-shirts' },
        { name: 'Women', category: 'womens-dresses' },
        { name: 'Kids', category: 'kids' }
      ] 
    },
    { 
      id: 3, 
      name: 'Home & Garden',
      category: 'home-decoration'
    },
    { 
      id: 4, 
      name: 'Beauty',
      category: 'skincare'
    },
  ];

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    navigate(`/products?category=${category}`);
    setIsMenuOpen(false);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigation now handled here
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary-dark hover:text-primary"
              onClick={() => setActiveCategory(null)}
            >
              ShopCart<span className="text-primary">.</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100">
                  <FiUser size={20} className="text-gray-700" />
                  <span className="hidden md:inline text-sm">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-sm font-medium text-gray-700 hover:text-primary"
              >
                Login
              </Link>
            )}
            
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
              aria-label="Shopping cart"
            >
              <FiShoppingCart size={20} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Categories - Desktop */}
        <div className="hidden md:flex justify-center space-x-6 py-3">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <button 
                className={`flex items-center px-3 py-2 text-sm font-medium ${activeCategory === (category.category || category.name.toLowerCase()) ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition-colors`}
                onClick={() => {
                  if (category.category) {
                    handleCategorySelect(category.category)
                  }
                }}
              >
                {category.name}
                {category.subcategories && <BsChevronDown className="ml-1" size={14} />}
              </button>
              
              {category.subcategories && (
                <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                  {category.subcategories.map((subcat, idx) => (
                    <button
                      key={idx}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect(subcat.category)}
                    >
                      {subcat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg rounded-lg mt-2">
            <div className="mb-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FiSearch size={20} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="border-b border-gray-100 pb-2">
                  <button 
                    className={`flex items-center justify-between w-full py-2 font-medium ${activeCategory === (category.category || category.name.toLowerCase()) ? 'text-primary' : 'text-gray-700'}`}
                    onClick={() => {
                      if (category.category) {
                        handleCategorySelect(category.category)
                      }
                    }}
                  >
                    {category.name}
                    {category.subcategories && <BsChevronDown size={14} />}
                  </button>
                  
                  {category.subcategories && (
                    <div className="pl-4 mt-1 space-y-1">
                      {category.subcategories.map((subcat, idx) => (
                        <button
                          key={idx}
                          className={`block w-full text-left py-1.5 text-sm ${activeCategory === subcat.category ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                          onClick={() => handleCategorySelect(subcat.category)}
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!user && (
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="block w-full text-left py-2 px-4 text-sm font-medium text-primary hover:bg-gray-100 rounded"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;