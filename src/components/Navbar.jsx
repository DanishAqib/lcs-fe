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
                <Link href="#">Home</Link>
                <Link href="#">About Us</Link>
                <Link href="#">Contact Us</Link>
                <Link to="/login">Log In</Link>
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
                        <Link href="#">About Us</Link>
                        <Link href="#">Contact Us</Link>
                        <Link to="/login">Log In</Link>
                    </div>
                </div>
            )
        }
    </>
  )
}
