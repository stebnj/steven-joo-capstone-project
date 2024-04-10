import React from 'react'
import ListingsList from '../../components/ListingsList/ListingsList'

export default function Home() {
  return (
    <main>
        <section>
            <div>
                <section>
                    <h1>Listings</h1>
                </section>
                <section>
                    <ListingsList />
                </section>
            </div>
        </section>
    </main>
  )
}
