import './Cart.css'; 
import axios from "axios";

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price?.replace('$', '') || 0);
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const handleCheckout = async () => {
    try {
      await axios.post("/checkout", cartItems);
    } catch (error) {
      console.error(error);
      alert("This is a test aka nothing is happening");
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <ul>
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.price}`} className="cart-item">
                  {item.name} x{item.quantity || 1} - $
                  {(item.price * (item.quantity || 1)).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <div className="cart-summary">
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

