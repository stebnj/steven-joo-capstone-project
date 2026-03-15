import React from 'react'
import ListingsList from '../../components/ListingsList/ListingsList'
import './Home.scss'

export default function Home() {
  return (
    <main>
        <section className='home'>
            <div className='home__listings-container'>
                <section className='home__listings'>
                    <ListingsList />
                </section>
            </div>
        </section>
    </main>
  )
}
