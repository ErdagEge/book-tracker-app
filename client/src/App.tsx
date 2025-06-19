import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import MyBooks from './pages/MyBooks';
import AddBook from './pages/AddBook';
import Stats from './pages/Stats'; 
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<MyBooks />} />
      <Route path="/add" element={<AddBook />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  )
}

export default App
