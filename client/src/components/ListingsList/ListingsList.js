import React, { useEffect, useState } from 'react';
import FilterModal from '../FilterModal/FilterModal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, collection, setDoc } from 'firebase/firestore';
import './ListingsList.scss'

export default function ListingsList() {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        minRent: null,
        maxRent: null,
        bedRange: "Any"
    });

    const { currentUser } = useAuth();
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const saveListing = async (listing) => {
        if (!currentUser) {
            alert("Please log in to save listings");
            return;
        }
        try {
            const userRef = doc(db, "users", currentUser.uid);
            const listingsCol = collection(userRef, "savedListings");
            await setDoc(doc(listingsCol), listing);
            alert("Listing saved successfully");
        } catch (error) {
            console.error("Error saving listing:", error);
            alert("Failed to save listing");
        }
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const getListings = async () => {
        if (!schoolName) {

            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:8080/listings/near-${schoolName}`, { params: filters });
            const fetchedListings = response.data;
            const coloredListings = colorCodeListings(fetchedListings, filters);
            setListings(coloredListings);
        } catch (err) {
            console.error("Error fetching listings:", err);
            setError(`Failed to load listings for ${schoolName}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (schoolName) {
            getListings();
        }
    }, []);

    const applyColorCoding = () => {
        if (!filters || Object.keys(filters).length === 0) return; // Skip if no filters are set
        const coloredListings = colorCodeListings(listings, filters);
        setListings(coloredListings);
    };
    
    useEffect(() => {
        applyColorCoding();
    }, [filters]);

    const colorCodeListings = (listings, filters) => {
        if (!filters || (filters.minRent === null && filters.maxRent === null && filters.bedRange === "Any")) {
            // Return listings without adding color or matchQuality if no filters are applied
            return listings.map(listing => ({ ...listing, color: undefined, matchQuality: undefined }));
        }

        return listings.map(listing => {
            let score = 0;
    
            if (filters.minRent !== null && listing.rent_range >= filters.minRent) {
                score += 1;
            }
    
            if (filters.maxRent !== null && listing.rent_range <= filters.maxRent) {
                score += 1;
            }
    
            if (filters.bedRange !== "Any" && listing.bed_range === filters.bedRange) {
                score += 1;
            }
    
            const maxScore = 3;
            const color = score > 0 ? (score === maxScore ? 'green' : (score > 1 ? 'yellow' : 'red')) : 'red';
            const matchQuality = score > 0 ? (score === maxScore ? "High Match" : (score > 1 ? "Medium Match" : "Low Match")) : "";
    
            return { ...listing, color, matchQuality };
        });
    };

    const resetFilters = () => {
        setFilters({ minRent: null, maxRent: null, bedRange: 'Any' })
        getListings()
    };


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
            <button onClick={openModal}>Filter</button>
            <FilterModal isOpen={isModalOpen} onClose={closeModal} onApplyFilters={handleApplyFilters} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {listings.map((listing) => (
                    <li className='list' key={listing.id}>
                        <Link to={`/listings/${listing.id}`} style={{ color: listing.color }}>
                            {listing.name} <span>({listing.matchQuality})</span>
                        </Link>
                        <button onClick={() => saveListing(listing)}>Save</button>
                    </li>
                    
                ))}
            </ul>
            <button onClick={resetFilters}>Reset Filters</button>
        </div>
    );
 


  return (
    <div className='listings'>
        <form className='listings__form' onSubmit={handleSearch}>
            <input
                className='listings__input'
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter a university"
            />
            <button className='listings__button' type="submit">Search</button>
        </form> 
        <button className='listings__button' onClick={openModal}>
            Filter
        </button>
        <FilterModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onApplyFilters={handleApplyFilters}
        />    
        
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      
        <ul className='listings__list'>
            {listings.map((listing) => (
                <li className='listings__item' key={listing.id}>
                    <Link to={`/listings/${listing.id}`}>
                        {listing.name}
                    </Link>
                    <button className='listings__button' onClick={() => saveListing(listing)}>Save</button>
                </li>
                
            ))}
        </ul>
    </div>
  )
}