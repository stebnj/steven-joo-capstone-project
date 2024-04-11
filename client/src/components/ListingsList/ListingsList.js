import React, { useEffect } from 'react'
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
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    const handleApplyFilters = (newFilters) => {
        console.log('Applying filters:', newFilters);
        setFilters(newFilters);
        console.log(listings)
    };


    const getListings = async (filters) => {
        console.log('Fetching listings with filters:', filters);
        setLoading(true);
        setError('')

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

    const filterListings = ({minRent, maxRent, bedRange}) => {
        return listings.filter(listing => {
            if (minRent && listings.rent_range < minRent) {
                return false;
            }

            if (maxRent && listing.rent_range > maxRent) {
                return false;
            }

            if (bedRange && bedRange !== "Any" && listing.bed_range !== bedRange) {
                return false;
            }

            return true;
        })

    }

    useEffect(() => {
        console.log(listings.length, listings)
        if(listings.length > 0){
            setListings(filterListings(filters))
        }
    }, [filters])

    const handleSearch = (event) => {
        event.preventDefault();
        getListings();
    };


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
        </form> 
        <button onClick={openModal}>
            Filter
        </button>
        <FilterModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onApplyFilters={handleApplyFilters}
        />    
        
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
