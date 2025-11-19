import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopCart</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products at unbeatable prices
        </p>
        <Link 
          to="/products" 
          className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Shop Now
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Feature cards would go here */}
      </div>
    </div>
  );
};

export default HomePage;