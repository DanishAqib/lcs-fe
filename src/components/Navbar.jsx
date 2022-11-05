import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
        <div className="navbar">
            <div className="navbar__logo">
                <h2>E-LAWYER</h2>
            </div>
            <div className="navbar__links">
                <Link to="/">Home</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/contact-us">Contact Us</Link>
                {
                    window.location.pathname === "/login" ? <Link to="/signup">Sign Up</Link> : <Link to="/login">Login</Link>
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
                            window.location.pathname === "/login" ? <Link to="/signup">Sign Up</Link> : <Link to="/login">Login</Link>
                        }
                    </div>
                </div>
            )
        }
    </>
  )
}
