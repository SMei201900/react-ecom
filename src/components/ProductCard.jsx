import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart, clickable }) => {
  const productId = product._id || product.id;

  return (
    <div className="product-card">
      {clickable ? (
        <Link to={`/products/${productId}`}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
        </Link>
      ) : (
        <>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
        </>
      )}
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
