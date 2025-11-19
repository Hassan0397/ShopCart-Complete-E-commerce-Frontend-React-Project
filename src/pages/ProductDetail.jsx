import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/products';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/products" 
        className="flex items-center text-primary hover:underline mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                <img 
                  src={image} 
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
              <span className="text-primary font-medium mr-1">{product.rating}</span>
              <span className="text-yellow-500">★</span>
            </div>
            <span className="text-gray-500 ml-2">{product.stock} in stock</span>
          </div>
          
          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through ml-2">
                  ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
                </span>
                <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg w-32">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="flex-grow text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;