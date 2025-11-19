export const fetchProducts = async (category = '') => {
  try {
    const url = category 
      ? `https://dummyjson.com/products/category/${category}`
      : 'https://dummyjson.com/products?limit=12';
      
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// ... keep existing fetchProductById function

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};