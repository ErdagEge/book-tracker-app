import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/add">Add Book</Link>
          <Link to="/mybooks">My Books</Link>
          <Link to="/stats">Stats</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
