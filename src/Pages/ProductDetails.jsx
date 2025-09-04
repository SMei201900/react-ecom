import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch product detail:', error); /*add axois pop up here*/
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductDetails;
