import { React, useState } from 'react'
import './Login.css'
import axios from 'axios'

 const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:5555/auth/register", {
        username,
        password
      });
      setUsername("")
      setPassword("")
      alert(response.data.message)
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <div className='Register'>
        <form onSubmit={handleRegister} autocomplete='off' class='form'>
          <div class='control'>
            <div className='SignIn_SignUp'>
              <h1>
                Sign Up
              </h1>
            </div>
          </div>
          <div class='control block-cube block-input'>
            <input name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' type='text' />
            <div class='bg-top'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg-right'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg'>
              <div class='bg-inner'></div>
            </div>
          </div>
          <div class='control block-cube block-input'>
            <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' />
            <div class='bg-top'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg-right'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg'>
              <div class='bg-inner'></div>
            </div>
          </div>
          <button class='btn block-cube block-cube-hover' type='submit'>
            <div class='bg-top'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg-right'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg'>
              <div class='bg-inner'></div>
            </div>
            <div class='text'>
              Register
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register