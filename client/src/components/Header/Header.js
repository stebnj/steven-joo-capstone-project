import React from 'react'
import profile from '../../assets/icons/Avatar.png'
import { Link } from 'react-router-dom'

import './Header.scss'

export default function Header() {
  return (
    <header className='header'> 
      <nav className='nav-bar'> 
        <section className='nav-bar__heading-container'>
          <Link className='nav-bar__link'>
            <h1 className='nav-bar__heading'>NEST</h1>
          </Link>
        </section>
        <section className='nav-bar__lists-container'>
          <ul className='nav-bar__lists'>
            <Link className='nav-bar__link'>
              <li className='nav-bar__item'>
                Home
              </li>
            </Link>
            <Link className='nav-bar__link'>
              <li className='nav-bar__item'>
                Listings
              </li>
            </Link>
          </ul>
        </section>
        <section className='nav-bar__right-container'>
          <div className='nav-bar__profile'>
            <img
              className='nav-bar__profile-img'
              src={profile} />
          </div>
          <div className='nav-bar__button-container'>
            <Link to="/">
              <button className='nav-bar__button'>
                  LOGIN
              </button>
            </Link>  
          </div>
        </section>
      </nav>
    </header>
  )
}
