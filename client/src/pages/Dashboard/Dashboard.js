import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, doc, getDocs } from 'firebase/firestore'


export default function Dashboard() {
const [error, setError] = useState('')
const { currentUser, logout } = useAuth()
const [savedListings, setSavedListings] = useState([]);
const navigate = useNavigate()


useEffect(() => {
    const fetchSavedListings = async () => {
        if (!currentUser) {
            setError('Please log in to view saved listings.');
            return;
        }

        const listingsRef = collection(doc(db, "users", currentUser.uid), "savedListings");
        try {
            const snapshot = await getDocs(listingsRef);
            const listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSavedListings(listings);
        } catch (err) {
            console.error("Error fetching saved listings:", err);
            setError("Failed to fetch saved listings.");
        }
    };

    fetchSavedListings();
}, [currentUser]);

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
