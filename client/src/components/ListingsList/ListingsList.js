import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function ListingsList() {
    const initialSearchTerm = ''
    const [listings, setListings] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

    const handleSearch = async (e) => {
        e.preventDefault()

        setLoading(true);
        setError('')
        setListings([])

        const school = searchTerm.trim().toLowerCase().replace(/\s+/g, '-')

        try {
            const response = await axios.get(`http://localhost:8080/listings/near-${school}`)
            setListings(response.data)
        } catch (err) {
            console.error('Error fetching listings:', err);
            setError('Failed to load listings for ' + searchTerm);
        } finally {
            setLoading(false);
            setSearchTerm(initialSearchTerm);
        }
    }



  return (
    <div>
         <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter Your University"
            />
        <button onClick={handleSearch}>Search</button>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
            {listings.map((listing) => (
                <li key={listing.id}>
                    <Link to={`/listings/${listing.id}`}>
                        {listing.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
