import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import Cart from './Pages/Cart.jsx';
import ProductDetail from './Pages/ProductDetails.jsx';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => (item._id || item.id) === productId
      );

      if (existingIndex !== -1) {
        // Item exists — increment quantity immutably
        const updatedItems = prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        return updatedItems;
      } else {
        // New item — add to cart
        const newItem = {
          ...product,
          id: productId,
          quantity: 1,
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Update quantity so I want 4 candles to become 2 candles 
  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: Math.max(1, quantity) } // prevent 0 or negative
          : item
      )
    );
  };

  // Remove items entirely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id) !== productId)
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

