import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import Cart from './Pages/Cart.jsx';
import ProductDetail from './Pages/ProductDetails.jsx';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

  setCartItems((prevItems) => {
    const newCart = [...prevItems, product];
    return newCart;
  });
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
