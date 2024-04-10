import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

export default function ListingDetails() {
    const {id} = useParams();
    const [listing, setListing] = useState(null);
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getListingDetails = async () => {
            setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/listings/${id}`)
            setListing(response.data);
        } catch (error) {
            console.error(`Error fetching listing details:`, error);
            setError("Failed to load listing details")
        } finally {
            setIsLoading(false)
        }
    }

    getListingDetails()

    }, [id])

  return (
    <div>
        <h1>
            Listing Details
        </h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {listing ? (
            <div>
                <h2>{listing.name}</h2>
                <p>Bedrooms: {listing.bed_range || 'N/A'}</p>
                <p>Rent: ${listing.rent_range}</p>
                <p>Address: {listing.address.full_address}</p>
            </div>
        ) : (
            !error && <p>Loading...</p>
        )}
    </div>
  )
}
