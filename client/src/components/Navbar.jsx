import { useState, React } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  const [cookies, setCokkies] = useCookies(["access_Token"])
  const navigate = useNavigate();

  const logout = () => {
    setCokkies("access_Token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  const login = () => {
    navigate("/auth")
  }

  const handleBlogAppClick = () => {
    setIsLoginClicked(false);
    // You can navigate to the homepage if needed
    // navigate("/");
  };

  return (
    <div className='navbar'>

      <div className='MyBlog'>
        <Link className='title' to="/" onClick={handleBlogAppClick}>BlogApp</Link>
      </div>
      <div className='secondHalf'>

        {!cookies.access_Token ? (
          <div>
            <div>
              <button className='login-btn' onClick={login}>Login/Register</button>
            </div>
            <div className='login-logout'>
              <Link to="/auth"></Link>
            </div>
          </div>
        ) :
          <div className='login-logout'>
            <div>
              <Link className='newPost' to="/create-post">Create new Post</Link>
            </div>
            <div>
              <button className='logout-btn' onClick={logout}>Logout ({window.localStorage.getItem('Username')})</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}