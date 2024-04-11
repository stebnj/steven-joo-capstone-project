import React from 'react'
import { useState, useEffect } from 'react'
import FilterModal from '../FilterModal/FilterModal'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function ListingsList() {
    const initialSearchTerm = ''
    const [listings, setListings] = useState([])
    const [error, setError] = useState('')
   
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filters, setFilters] = useState({})

    

    const handleSearch = async (e) => {
        

        setLoading(true);
        setError('')
        setListings([])

        const school = searchTerm.trim().toLowerCase().replace(/\s+/g, '-')

        try {
            const response = await axios.get(`http://localhost:8080/listings`, {params: filters})
            setListings(response.data)
        } catch (err) {
            console.error('Error fetching listings:', err);
            setError('Failed to load listings for ' + searchTerm);
        } finally {
            setLoading(false);
            setSearchTerm(initialSearchTerm);
        }
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false);

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        handleSearch();
        closeModal();
    };



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
        <div>
        <button onClick={openModal}>Filter</button>
           <FilterModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onApplyFilters={applyFilters}
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
