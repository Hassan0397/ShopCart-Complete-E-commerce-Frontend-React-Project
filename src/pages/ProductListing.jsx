import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/products';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Slider } from '@mui/material'; // For better range slider

const ProductListing = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    minRating: 0,
    inStock: false
  });
  
  // Sort state
  const [sortOption, setSortOption] = useState('featured');

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(category || '');
        setAllProducts(data);
        
        // Set max price based on fetched products
        if (data.length > 0) {
          const maxPrice = Math.max(...data.map(p => p.price));
          setFilters(prev => ({
            ...prev,
            priceRange: [0, Math.ceil(maxPrice / 100) * 100] // Round up to nearest 100
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [category]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter - matches title or description
      const matchesSearch = searchQuery === '' || 
                         product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price range filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
                         product.price <= filters.priceRange[1];
      
      // Rating filter
      const matchesRating = product.rating >= filters.minRating;
      
      // Stock filter
      const matchesStock = !filters.inStock || product.stock > 0;
      
      return matchesSearch && matchesPrice && matchesRating && matchesStock;
    });
  }, [allProducts, searchQuery, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    
    switch(sortOption) {
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'rating':
        return productsCopy.sort((a, b) => b.rating - a.rating);
      case 'newest':
        // Assuming products have a createdAt date
        return productsCopy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default:
        return productsCopy;
    }
  }, [filteredProducts, sortOption]);

  const getCategoryName = (category) => {
    switch(category) {
      case 'smartphones': return 'Phones';
      case 'laptops': return 'Laptops';
      case 'mens-shirts': return "Men's Fashion";
      case 'womens-dresses': return "Women's Fashion";
      case 'home-decoration': return 'Home & Garden';
      case 'skincare': return 'Beauty';
      default: return 'All Products';
    }
  };

  const handlePriceChange = (event, newValue) => {
    setFilters({
      ...filters,
      priceRange: newValue
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      priceRange: [0, Math.max(...allProducts.map(p => p.price))],
      minRating: 0,
      inStock: false
    });
    setSortOption('featured');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">
          {category ? getCategoryName(category) : 'All Products'}
          {sortedProducts.length > 0 && (
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'})
            </span>
          )}
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          
          {/* Filter and Sort Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-primary text-white' 
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FiFilter />
              <span>Filters</span>
              {showFilters ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={filters.priceRange[1] > 2000 ? filters.priceRange[1] : 2000}
                  step={10}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <h3 className="font-medium mb-4">Minimum Rating</h3>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters({...filters, minRating: rating})}
                    className={`px-3 py-1 rounded-full ${
                      filters.minRating === rating
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Stock Filter */}
            <div className="flex items-center justify-start md:justify-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                    className="sr-only"
                  />
                  <div className={`block w-14 h-8 rounded-full ${
                    filters.inStock ? 'bg-primary' : 'bg-gray-300'
                  }`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                    filters.inStock ? 'transform translate-x-6' : ''
                  }`}></div>
                </div>
                <span className="font-medium">In Stock Only</span>
              </label>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {(searchQuery || filters.minRating > 0 || filters.inStock || filters.priceRange[0] > 0 || filters.priceRange[1] < Math.max(...allProducts.map(p => p.price))) && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearAllFilters}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <FiX size={18} />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No products match your search and filters.</p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;