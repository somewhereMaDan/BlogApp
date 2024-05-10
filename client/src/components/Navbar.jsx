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
  };

  return (
    <div className='navbar'>

      <div className='MyBlog'>
        <div>
          <Link className='title' to="/" onClick={handleBlogAppClick}>BlogApp</Link>
        </div>
      </div>
      <div className='secondHalf'>

        {!cookies.access_Token ? (
          <div>
            <div className='login-Register-btn'>
              <button className='login-btn' onClick={login}>Login/Register</button>
            </div>
            {/* <div className='login-logout'>
              <Link to="/auth">Please</Link>
            </div> */}
          </div>
        ) :
          <div className='login-logout'>
            <div>
              <Link className='my-Blogs' to="/my-blogs">My Blogs</Link>
            </div>
            <div>
              <Link className='newPost' to="/create-post">Create new Post</Link>
            </div>
            <div>
              <Link className='savedBlogs' to="/saved-blogs">Saved Blogs</Link>
            </div>
            <div className='logout-div-btn'>
              <button className='logout-btn' onClick={logout}><span class="text">Logout ({window.localStorage.getItem('Username')})</span> </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}