import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <span ><Link to="/">Home</Link></span>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navbar;
