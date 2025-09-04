import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appleCandle from '../assets/apple-candle.png';  
import strawberryCandle from '../assets/strawberry-candle.png';
import orangeCandle from '../assets/orange-candle.png';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 

 
  const staticProducts = [
    { id: 1, name: 'Apple Candle', price: '$12.99', image: appleCandle },
    { id: 2, name: 'Strawberry Candle', price: '$8.99', image: strawberryCandle },
    { id: 3, name: 'Orange Candle', price: '$10.99', image: orangeCandle },
  ];

  // Fetch products from the backend (MongoDB)
  useEffect(() => {
    axios.get('http://localhost:5000/products')  
      .then(response => {
        setProducts(response.data);  
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);  // Stop loading even in case of an error
      });
  }, []);  

  const combinedProducts = [...staticProducts, ...products];  

  return (
    <div>
      <h1>Our Products</h1>
      
      {loading ? (
        <p>Loading products...</p>  // Display loading text while fetching data
      ) : (
        <div className="product-list">
          {combinedProducts.map((product) => (
            <ProductCard
              key={product.id || product._id}  // Use dynamic MongoDB _id or static id
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
