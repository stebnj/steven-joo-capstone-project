import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore'
import './Dashboard.scss'

export default function Dashboard() {
const [error, setError] = useState('')
const { currentUser, logout } = useAuth()
const [savedListings, setSavedListings] = useState([]);



useEffect(() => {
    const fetchSavedListings = async () => {
        if (!currentUser) {
            setError('Please log in to view saved listings.');
            return;
        }

        const listingsRef = collection(doc(db, "users", currentUser.uid), "savedListings");

        try {
            const snapshot = await getDocs(listingsRef);
           
            const listings = snapshot.docs.map(doc =>{ const {id, ...otherData } = doc.data(); return ({ id: `${doc.id}`, ...otherData })});
            // const listings = snapshot.docs.map(doc => ({
            //     docId:doc.id, ...doc.data()
            // }))
            console.log(listings)
     
            setSavedListings(listings);
            
        } catch (err) {
            console.error("Error fetching saved listings:", err);
            setError("Failed to fetch saved listings.");
        }
    };

    fetchSavedListings();
}, [currentUser]);


const removeListing = async (listingId) => {
    console.log(listingId)
    

    if (!currentUser) {
        alert('You must be logged in to remove listings.');
        return;
    }
    
    
    try {
        const listingDocRef = doc(db, "users", currentUser.uid, "savedListings", listingId)
        await deleteDoc(listingDocRef);
        setSavedListings(savedListings.filter(listing => listing.id !== listingId)); 
        console.log(savedListings)
        alert("Listing removed successfully!");
    } catch (error) {
        console.error("Error removing listing:", error);
        alert("Failed to remove listing.");
    }
};



async function handleLogout() {
    setError('')

    try{
        await logout()
    } catch {
        setError('Failed to log out')
    }
}

  return (
    <main>
        <section>
            <section>
                <h2>Your Profile</h2>
            </section>
            <section>
                <p>
                    <strong>Email: </strong>
                    {currentUser.email} 
                </p>
                <Link to="/update-profile">
                    <button>
                        Update Profile    
                    </button>
                </Link>
            </section>
            <section>
                <h3>Saved Listings</h3>
                {savedListings.length > 0 ? (
                    <ul>
                        {savedListings.map(listing => (
                            <li key={listing.id}>
                                <Link to={`/listings/${listing.id}`}>
                                    {listing.name}
                                </Link>
                                <button onClick={() => removeListing(listing.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved listings found</p>
                )}
            </section>
            <section>
                <button onClick={handleLogout}>
                    Log Out 
                </button>
            </section>
        </section>
    </main>
  )
}
