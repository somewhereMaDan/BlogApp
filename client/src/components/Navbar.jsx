import { useState, React } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import 'flowbite'

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
    // <div className='navbar'>

    //   <div className='MyBlog'>
    //     <div>
    //       <Link className='title' to="/" onClick={handleBlogAppClick}>BlogApp</Link>
    //     </div>
    //   </div>
    //   <div className='secondHalf'>

    //     {!cookies.access_Token ? (
    //       <div>
    //         <div className='login-Register-btn'>
    //           <button className='login-btn' onClick={login}>Login/Register</button>
    //         </div>
    //         {/* <div className='login-logout'>
    //           <Link to="/auth">Please</Link>
    //         </div> */}
    //       </div>
    //     ) :
    //       <div className='login-logout'>
    //         <div>
    //           <Link className='my-Blogs' to="/my-blogs">My Blogs</Link>
    //         </div>
    //         <div>
    //           <Link className='newPost' to="/create-post">Create new Post</Link>
    //         </div>
    //         <div>
    //           <Link className='savedBlogs' to="/saved-blogs">Saved Blogs</Link>
    //         </div>
    //         <div className='logout-div-btn'>
    //           <button className='logout-btn' onClick={logout}><span class="text">Logout ({window.localStorage.getItem('Username')})</span> </button>
    //         </div>
    //       </div>
    //     }
    //   </div>
    // </div>

    <nav class="bg-gray-900 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" onClick={handleBlogAppClick}>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogApp</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          {!cookies.access_Token ? (
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover:bg-blue-700" aria-current="page">Home</Link>
              </li>
              <li>
                <button onClick={login} class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover:bg-blue-700 " aria-current="page">Login/Register</button>
              </li>
            </ul>
          ) :
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover:bg-blue-700" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/my-blogs" class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover:bg-blue-700 " aria-current="page">My Blogs</Link>
              </li>
              <li>
                <Link to="/create-post" class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover:bg-blue-700" aria-current="page">Create new Post</Link>
              </li>
              <li>
                <Link to="/saved-blogs" class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 hover:bg-blue-700" aria-current="page">Saved Blogs</Link>
              </li>
              <li>
                <button className='logout-btn' onClick={logout} class="block py-2 px-3 text-white-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 hover:bg-red-700" aria-current="page"><span class="text">Logout ({window.localStorage.getItem('Username')})</span> </button>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>

  )
}