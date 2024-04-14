import React from 'react'
import profile from '../../assets/icons/Avatar.png'
import logo from '../../assets/logo/nest-logo.svg'
import { Link } from 'react-router-dom'

import './Header.scss'

export default function Header() {
  return (
    <header className='header'> 
      <nav className='nav-bar'> 
        <section className='nav-bar__heading-container'>
          <Link to="/" className='nav-bar__link'>
            <img
              src={logo}
              className='nav-bar__heading' />
          </Link>
        </section>
        <section className='nav-bar__lists-container'>
          <div className='nav-bar__profile'>
            <Link to="/dashboard">  
              <img
                className='nav-bar__profile-img'
                src={profile} />
            </Link>
          </div>
          <ul className='nav-bar__lists'>
            <Link to="/dashboard" className='nav-bar__link'>
              <li className='nav-bar__item'>
                 My Listings
              </li>
            </Link>
          </ul>
          <section className='nav-bar__right-container'>
            <div className='nav-bar__button-container'>
              <Link to="/login">
                <button className='nav-bar__button'>
                    Log in
                </button>
              </Link>  
            </div>
          </section>
        </section>

      </nav>
    </header>
  )
}
