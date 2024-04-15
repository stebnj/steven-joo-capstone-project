import React, { useEffect, useState } from "react";
import FilterModal from "../FilterModal/FilterModal";
import axios from "axios";
import filter from "../../assets/icons/filter.svg";
import reset from "../../assets/icons/reset.svg";
import save from "../../assets/icons/save.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, collection, setDoc } from "firebase/firestore";
import "./ListingsList.scss";

export default function ListingsList() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    minRent: null,
    maxRent: null,
    bedRange: "Any",
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
      const listingToSave = {
        name: listing.name,
        rent_range: listing.rent_range,
        bed_range: listing.bed_range,
        id: listing.id,
      };
      await setDoc(doc(listingsCol), listingToSave);
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
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/listings/near-${schoolName}`,
        { params: filters }
      );
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
    if (
      !filters ||
      (filters.minRent === null &&
        filters.maxRent === null &&
        filters.bedRange === "Any")
    ) {
      // Return listings without adding color or matchQuality if no filters are applied
      return listings.map((listing) => ({
        ...listing,
        color: undefined,
        matchQuality: undefined,
      }));
    }

    const enhancedListings = listings.map((listing) => {
      let score = 0;

      if (filters.minRent !== null && listing.rent_range >= filters.minRent) {
        score += 1;
      }

      if (filters.maxRent !== null && listing.rent_range <= filters.maxRent) {
        score += 1;
      }

      if (
        filters.bedRange !== "Any" &&
        listing.bed_range === filters.bedRange
      ) {
        score += 1;
      }

      const maxScore = 3;
      const color =
        score > 0
          ? score === maxScore
            ? "green"
            : score > 1
            ? "rgb(197, 150, 47)"
            : "red"
          : "red";
      const matchQuality =
        score > 0
          ? score === maxScore
            ? "High Match"
            : score > 1
            ? "Medium Match"
            : "Low Match"
          : "";

      return { ...listing, color, matchQuality, score };
    });
    enhancedListings.sort((a, b) => b.score - a.score);

    return enhancedListings;
  };

  const resetFilters = () => {
    setFilters({ minRent: null, maxRent: null, bedRange: "Any" });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getListings();
  };

  return (
    <div className="listings">
      <div className="listings__heading-container">
        <h2 className="listings__heading">Listings</h2>
        <div className="listings__image-container">
          <img
            src={filter}
            className="listings__filter"
            alt="filter image"
            onClick={openModal}
          />
          <img
            src={reset}
            className="listings__reset"
            onClick={resetFilters}
            alt="reset image"
          />
        </div>

        <FilterModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onApplyFilters={handleApplyFilters}
        />
      </div>
      <form className="listings__form" onSubmit={handleSearch}>
        <input
          className="listings__input"
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="Enter a university"
        />
        <div className="listings__image-container-desktop">
          <img
            src={filter}
            className="listings__filter"
            alt="filter image"
            onClick={openModal}
          />
          <img
            src={reset}
            className="listings__reset"
            onClick={resetFilters}
            alt="reset image"
          />
        </div>
        <button className="listings__button" type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="listings__error">{error}</p>}
      <hr className="listings__divider"></hr>

      <ul className="listings__list">
        {listings.map((listing) => (
          <li className="listings__item" key={listing.id}>
            <Link
              className="listings__item-name"
              to={`/listings/${listing.id}`}
              style={{ color: listing.color }}
            >
              {listing.name}{" "}
              {listing.matchQuality && <span> ({listing.matchQuality})</span>}
            </Link>
            <img
              className="listings__save"
              src={save}
              onClick={() => saveListing(listing)}
            />
          </li>
          
        ))}
      </ul>
     
    </div>
  );
}
