import React from 'react'
import Login from './Login'
import Register from './Register'

function Auth() {
  return (
    <div className='auth-page' style={{ backgroundColor: 'black', color: 'white', height: '100vh', fontFamily: 'monospace, serif' }}>
      <Login></Login>
      <Register></Register>
    </div>
  )
}

export default Auth