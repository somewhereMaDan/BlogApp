import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.css'
import Login from './pages/Login'
import Auth from './pages/Auth'
import Home from './pages/Home';
import { Navbar } from './components/Navbar';
import CreatePost from './pages/CreatePost';
import SavedBlogs from './pages/SavedBlogs';

export const Appcontext = createContext(null);
function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/saved-blogs' element={<SavedBlogs />} />
          </Routes>
        </BrowserRouter>
      </div >
    </>
  )
}

export default App
