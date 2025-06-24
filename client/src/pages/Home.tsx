import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>📚 BookTracker</h1>
      <p>Your personal reading companion.</p>

      {user ? (
        <Link to="/add" className="home-btn">Add Your Next Book →</Link>
      ) : (
        <Link to="/signup" className="home-btn">Start Tracking →</Link>
      )}
    </div>
  );
};

export default Home;
