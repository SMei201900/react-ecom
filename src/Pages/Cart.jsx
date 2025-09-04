import axios from "axios";

const Cart = ({ cartItems }) => {
  // Calculate the total price
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    try {
      // Simulate a checkout API request that always fails
      await axios.post("/checkout", cartItems);

    } catch (error) {
      // Force an error with custom message
      console.error("This is a test aka nothing is happening");
      alert("This is a test aka nothing is happening");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
