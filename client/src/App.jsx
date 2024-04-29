import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.css'
import Login from './pages/Login'
import Auth from './pages/Auth'
import Home from './pages/Home';
import { Navbar } from './components/Navbar';
import CreatePost from './pages/CreatePost';

export const Appcontext = createContext(null);
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost/>} />
          </Routes>
        </BrowserRouter>
      </div >
    </>
  )
}

export default App
