import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>📚 Book Tracker</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">My Books</Link></li>
        <li><Link to="/add">Add Book</Link></li>
        <li><Link to="/stats">Stats</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
