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
      <h1 className="navbar-title">📚 Book Tracker</h1>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/books">My Library</Link>
            <Link to="/stats">Stats</Link>
            <span className="navbar-user">👤 {user.email}</span>
            <button className="navbar-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
