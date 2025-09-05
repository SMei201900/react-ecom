import { useState, useEffect } from 'react';
import axios from 'axios';
import appleCandle from '../assets/apple-candle.png';
import strawberryCandle from '../assets/strawberry-candle.png';
import orangeCandle from '../assets/orange-candle.png';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticProducts = [
    { id: 1, name: 'Apple Basket Candle', price: 12.99, image: appleCandle },
    { id: 2, name: 'Strawberry Candle', price: 8.99, image: strawberryCandle },
    { id: 3, name: 'Orange Candle', price: 10.99, image: orangeCandle },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error); /*probably can axios popup it*/
        setLoading(false);
      });
  }, []);

  const combinedProducts = [...staticProducts, ...products];

  //remove duplicates 
  const uniqueProducts = combinedProducts.filter((product, index, self) =>
    index === self.findIndex(p => p.image === product.image)
  );

  return (
    <div>
      <h1>Our Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {uniqueProducts.map((product) => {
            const clickable = !!product._id;

            return (
              <ProductCard
                key={product.id || product._id}
                product={product}
                addToCart={addToCart}
                clickable={clickable}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
