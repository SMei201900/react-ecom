import './Cart.css'; // ✅ Import the CSS file
import axios from "axios";

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  {item.name} - ${item.price.toFixed(2)}
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

