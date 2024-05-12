// import { useState, React } from 'react'
// import { Link } from 'react-router-dom'
// import { useCookies } from 'react-cookie'
// import { useNavigate } from 'react-router-dom'
// import './Navbar.css'
// import 'flowbite'
// import { RiArrowRightUpLine, RiCloseLargeLine, RiMenuLine } from 'react-icons/ri'; // Import icons as needed


// export const Navbar = () => {
//   const [cookies, setCokkies] = useCookies(["access_Token"])
//   const navigate = useNavigate();

//   const logout = () => {
//     setCokkies("access_Token", "");
//     window.localStorage.removeItem("userID");
//     navigate("/auth");
//   }

//   const login = () => {
//     navigate("/auth")
//   }

//   const handleBlogAppClick = () => {
//     setIsLoginClicked(false);
//   };

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (

//     <nav className="nav container">
//       <Link to={"/"} className="nav__logo">BlogApp</Link>

//       <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
//         {!cookies.access_Token ? (
//           <ul className="nav__list">
//             <li className="nav__item">
//               <Link to="/" className="nav__link">
//                 <RiArrowRightUpLine />
//                 <span>Home</span>
//               </Link>
//             </li>
//             <li className="nav__item">
//               <Link to="/auth" className="nav__link">
//                 <RiArrowRightUpLine />
//                 <span>Login/Register</span>
//               </Link>
//             </li>
//           </ul>

//         ) : (
//           <ul className="nav__list">
//             <li className="nav__item">
//               <Link to="/my-blogs" className="nav__link">
//                 <RiArrowRightUpLine />
//                 <span>My Blogs</span>
//               </Link>
//             </li>

//             <li className="nav__item">
//               <Link to="/create-post" className="nav__link">
//                 <RiArrowRightUpLine />
//                 <span>Create Post</span>
//               </Link>
//             </li>

//             <li className="nav__item">
//               <Link to="/saved-blogs" className="nav__link">
//                 <RiArrowRightUpLine />
//                 <span>Saved Blogs</span>
//               </Link>
//             </li>

//             <li className="nav__item">
//               <button onClick={logout} className="nav__link">
//                 <RiArrowRightUpLine />
//                 <span>Logout</span>
//               </button>
//             </li>
//           </ul>
//         )
//         }

//         <div className="nav__close" id="nav-close" onClick={toggleMenu}>
//           <RiCloseLargeLine />
//         </div>

//         <div className="nav__social">
//           {/* Add your social links here */}
//         </div>
//       </div>

//       <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
//         <RiMenuLine />
//       </div>
//     </nav>
//   )
// }

import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { RiArrowRightUpLine, RiCloseLargeLine, RiMenuLine } from 'react-icons/ri';

export const Navbar = () => {
  const [cookies, setCokkies] = useCookies(["access_Token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCokkies("access_Token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const login = () => {
    navigate("/auth");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav container">
      <Link to={"/"} className="nav__logo" onClick={closeMenu}>
        BlogApp
      </Link>

      <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
        {!cookies.access_Token ? (
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link" onClick={closeMenu}>
                <RiArrowRightUpLine />
                <span>Home</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/auth" className="nav__link" onClick={closeMenu}>
                <RiArrowRightUpLine />
                <span>Login/Register</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/my-blogs" className="nav__link" onClick={closeMenu}>
                <RiArrowRightUpLine />
                <span>My Blogs</span>
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/create-post" className="nav__link" onClick={closeMenu}>
                <RiArrowRightUpLine />
                <span>Create Post</span>
              </Link>
            </li>

            <li className="nav__item">
              <Link to="/saved-blogs" className="nav__link" onClick={closeMenu}>
                <RiArrowRightUpLine />
                <span>Saved Blogs</span>
              </Link>
            </li>

            <li className="nav__item">
              <button onClick={logout} className="nav__link">
                <RiArrowRightUpLine />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        )}

        <div className="nav__close" id="nav-close" onClick={toggleMenu}>
          <RiCloseLargeLine />
        </div>

        <div className="nav__social">
          {/* Add your social links here */}
        </div>
      </div>

      <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
        <RiMenuLine />
      </div>
    </nav>
  );
};
