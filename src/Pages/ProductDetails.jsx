import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetails.css'; 

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
        console.error('Failed to fetch product detail:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-container">
      <h1 className="product-title">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-description">{product.description}</p>

    {product.extraInfo && (
      <div className="product-extra-info">
        <h3>More Information</h3>
        <p>{product.extraInfo}</p>
      </div>
    )}
    </div>
  );
};

export default ProductDetails;

