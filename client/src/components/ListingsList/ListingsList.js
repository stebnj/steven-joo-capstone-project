import React from 'react'
import { useState } from 'react'
import FilterModal from '../FilterModal/FilterModal'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function ListingsList() {
    const [listings, setListings] = useState([])
    const [error, setError] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filters, setFilters] = useState({})

    const handleSearch = (event) => {
        event.preventDefault();
        getListings();
    };

    const handleApplyFilters = (newFilters) => {
        console.log('Applying filters:', newFilters);
        setFilters(newFilters);
        setIsModalOpen(false);
        getListings();
    };


    const getListings = async () => {
        console.log('Fetching listings with filters:', filters);
        setLoading(true);
        setError('')
        setListings([])

        try {
            const response = await axios.get(`http://localhost:8080/listings/near-${schoolName}`, {
                params: filters
            })
            setListings(response.data)
        } catch (err) {
            console.error('Error fetching listings:', err);
            setError(`Failed to load listings for ${schoolName}`);
        } finally {
            setLoading(false);
        }
    }




  return (
    <div>
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter a university"
            />
            <button type="submit">Search</button>
            <button type="button" onClick={() => setIsModalOpen(true)}>Filter</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div>
           <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApplyFilters={handleApplyFilters}
            />    
        </div>
     
        
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
