import React from 'react'
import Login from './Login'
import Register from './Register'

function Auth({ setUserData }) {
  return (
    <div className='auth-page' style={{ backgroundColor: 'black', color: 'white', height: '100vh', fontFamily: 'monospace, serif' }}>
      <Login setUserData={setUserData}></Login>
      <Register></Register>
    </div>
  )
}

export default Auth