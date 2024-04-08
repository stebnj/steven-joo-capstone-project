import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

export default function Header() {
  return (
    <header> 
      <section> 
        <section>
          <Link>
            <h1>NEST</h1>
          </Link>
        </section>
      </section>
    </header>
  )
}
