import React, { useEffect } from 'react'
import { useState } from 'react'
import FilterModal from '../FilterModal/FilterModal'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'
import { doc, collection, setDoc } from 'firebase/firestore'



export default function ListingsList() {
    const [listings, setListings] = useState([])
    const [error, setError] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filters, setFilters] = useState({})

    const { currentUser } = useAuth();
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const saveListing = async(listing) => {
        if (!currentUser) {
            alert("Please log in to save listings")
            return;
        }

        try{
            const userRef = doc(db, "users", currentUser.uid);
            const listingsCol = collection(userRef, "savedListings");
            await setDoc(doc(listingsCol), listing);
            alert("Listing saved successfully")
        } catch (error) {
            console.error("Error saving listing:", error);
            alert("Failed to save listing")
        }
    }



    const handleApplyFilters = (newFilters) => {
        
        setFilters(newFilters);
        console.log(listings)
    };


    const getListings = async (filters) => {
        
        setLoading(true);
        setError('')

        try {
            const response = await axios.get(`http://localhost:8080/listings/near-${schoolName}`, {
                params: filters 
            })
            setListings(response.data)
        } catch (err) {
            
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
                    <button onClick={() => saveListing(listing)}>Save</button>
                </li>
                
            ))}
        </ul>
    </div>
  )
}
