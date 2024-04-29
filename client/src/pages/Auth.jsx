import React from 'react'
import Login from './Login'
import Register from './Register'

function Auth({ setUserData }) {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', fontFamily: 'monospace, serif' }}>
      <Login setUserData={setUserData}></Login>
      <Register></Register>
    </div>
  )
}

export default Auth