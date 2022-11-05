import React from 'react'
import { Link } from 'react-router-dom';
import LandingPageLogo from "../../assets/images/landing-page-logo.png"
import { Navbar } from '../../components/Navbar'
import "./landingPage.css"

export const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <Navbar/>
        <div className="landing-page__content">
          <div className="landing-page__content__logo">
            <img src={LandingPageLogo} alt="landing-page-logo" />
          </div>
          <div className="landing-page__content__button">
            <Link className='button' to="/login">Get started</Link>
          </div>
        </div>
      </div>
    </>
  )
}