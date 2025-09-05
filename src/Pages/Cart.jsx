import './Cart.css'; 
import axios from "axios";

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
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
      alert("This is a test aka nothing will happen");
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
                <li key={`${item.id}-${item.price}`} className="cartProduct">

                  <div className="itemInfo">
                    <span>{item.name}</span>  {/* Left side: Only Product Name */}
                  </div>

                  {/* Right side: Price, Quantity Controls, and Remove Button */}
                  <div className="rightSide">
                    <span className="price">${(item.price * (item.quantity || 1)).toFixed(2)}</span>

                    <div className="quantityBtn">
                      <button onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="removeBtn">X</button>
                  </div>
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

