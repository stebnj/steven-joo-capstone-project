import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import garbage from "../../assets/icons/delete.svg";
import "./Dashboard.scss";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [savedListings, setSavedListings] = useState([]);

  useEffect(() => {
    const fetchSavedListings = async () => {
      if (!currentUser) {
        setError("Please log in to view saved listings.");
        return;
      }

      const listingsRef = collection(
        doc(db, "users", currentUser.uid),
        "savedListings"
      );

      try {
        const snapshot = await getDocs(listingsRef);



        const listings = snapshot.docs.map((doc) => {
            const data = doc.data(); 
            return {
              docId: doc.id,  
              id: data.id,    
              ...data         
            };
          });


        console.log(listings);

        setSavedListings(listings);
      } catch (err) {
        console.error("Error fetching saved listings:", err);
        setError("Failed to fetch saved listings.");
      }
    };

    fetchSavedListings();
  }, [currentUser]);

  const removeListing = async (listingId) => {
    console.log(listingId);

    if (!currentUser) {
      alert("You must be logged in to remove listings.");
      return;
    }

    try {
      const listingDocRef = doc(
        db,
        "users",
        currentUser.uid,
        "savedListings",
        listingId
      );
      await deleteDoc(listingDocRef);
      setSavedListings(
        savedListings.filter((listing) => listing.docId !== listingId)
      );
      console.log(savedListings);
      alert("Listing removed successfully!");
    } catch (error) {
      console.error("Error removing listing:", error);
      alert("Failed to remove listing.");
    }
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <main>
      <section className="dashboard">
        <section className="dashboard__heading-container">
          <h2 className="dashboard__heading">Your Profile</h2>
        </section>
        <section className="dashboard__info">
          <p className="dashboard__email">
            <strong>Email: </strong>
            {currentUser.email}
          </p>
          <Link className="dashboard__link" to="/update-profile">
            <button className="dashboard__button">Update Profile</button>
          </Link>
        </section>
        <hr className="dashboard__divider"></hr>
        <section className="dashboard__saved">
          <h1 className="dashboard__saved-heading">Saved Listings</h1>
          {savedListings.length > 0 ? (
            <ul className="dashboard__list">
              {savedListings.map((listing) => (
                <li className="dashboard__item" key={listing.docId}>
                  <Link
                    className="dashboard__listing-link"
                    to={`/listings/${listing.id}`}
                  >
                    {listing.name}
                  </Link>
                  <img
                    src={garbage}
                    className="dashboard__image"
                    onClick={() => removeListing(listing.docId)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="dashboard__message">No saved listings found</p>
          )}
        </section>
        <section className="dashboard__button-container">
          <button className="dashboard__button" onClick={handleLogout}>
            Log Out
          </button>
        </section>
      </section>
    </main>
  );
}
