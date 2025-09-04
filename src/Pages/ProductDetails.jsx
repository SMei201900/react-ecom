import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();  // get product id from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product detail from backend by id
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch product detail:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      {product.image && <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />}
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
