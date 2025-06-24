import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyBooks from './pages/MyBooks';
import AddBook from './pages/AddBook';
import Stats from './pages/Stats'; 
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="page">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<MyBooks />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App
