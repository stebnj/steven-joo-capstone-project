import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ListingsList() {
    const [listings, setListingss] = useState([])
    
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const getListings = async () => {
            setIsLoading(true);
            try{
                const response = await axios.get(`http://localhost:8080/listings`)
                setListingss(response.data);
            } catch(err) {
                console.error(`Error fetching listings:`, err);
            } finally {
                setIsLoading(false)
            }
        };

        getListings()


    }, [])

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        <ul>
            {listings.map((listing) => (
                <li key={listing.id}>{listing.name}</li>
            ))}
        </ul>
    </div>
  )
}
