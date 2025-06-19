import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyBooks from './pages/MyBooks';
import AddBook from './pages/AddBook';
import Stats from './pages/Stats'; 
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
        </Routes>
      </div>
    </>
  )
}

export default App
