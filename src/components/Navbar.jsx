import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

  const onLogout = () => {
    localStorage.clear();
    navigate(0);
  }

  return (
    <>
        <div className="navbar">
            <div className="navbar__logo"
                onClick={() => navigate("/")}
            >
                <h2>E-LAWYER</h2>
            </div>
            <div className="navbar__links">
                <Link to="/">Home</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/contact-us">Contact Us</Link>
                {
                    isLoggedIn ? (
                        <button className="button logout-btn" onClick={onLogout} >
                            Logout
                        </button>
                    ) : window.location.pathname === "/login" ? (
                        <Link to="/signup">Sign Up</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }
            </div>
            <div className={`hamburger-menu ${openMenu ? "active" : ""}`} onClick={() => setOpenMenu(!openMenu)}>
                <div className="hamburger-menu__line"></div>
                <div className="hamburger-menu__line"></div>
                <div className="hamburger-menu__line"></div>
            </div>
        </div>
        {
            openMenu && (
                <div className="navbar__links__mobile__container">
                    <div className="navbar__links__mobile">
                        <Link href="#">Home</Link>
                        <Link to="/about-us">About Us</Link>
                        <Link to="/contact-us">Contact Us</Link>
                        {
                            isLoggedIn ? (
                                <button className="logout-link" onClick={onLogout} >
                                    Logout
                                </button>
                            ) : window.location.pathname === "/login" ? (
                                <Link to="/signup">Sign Up</Link>
                            ) : (
                                <Link to="/login">Login</Link>
                            )
                        }
                    </div>
                </div>
            )
        }
    </>
  )
}
