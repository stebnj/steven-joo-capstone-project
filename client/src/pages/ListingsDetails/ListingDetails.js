import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import house from "../../assets/images/house.svg";
import back from "../../assets/icons/back.svg";
import "./ListingDetails.scss";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getListingDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/listings/${id}`
        );
        setListing(response.data);
      } catch (error) {
        console.error(`Error fetching listing details:`, error);
        setError("Failed to load listing details");
      } finally {
        setIsLoading(false);
      }
    };

    getListingDetails();
  }, [id]);

  return (
    <section className="details">
      <div className="details__heading-container">
        <Link to="/">
            <img src={back} className="details__back" alt="back image" />
        </Link>
        <h2 className="details__heading">Home</h2>
      </div>
      {/* dynamic images can only be received through requests through the api using a get request, 
    but due to the limit of requests, that will be left as an aspect that could be worked on in the future */}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {listing ? (
        <div className="details__content">
          <h1 className="details__name">{listing.name}</h1>
          <img src={house} className="details__image" alt="house image" />
          <p className="details__bed">
            <strong>Bedrooms</strong>: {listing.bed_range || "N/A"}
          </p>
          <p className="details__price">
            <strong>Rent</strong>: ${listing.rent_range}
          </p>
          <p className="details__address">
            <strong>Address</strong>: {listing.address.full_address}
          </p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </section>
  );
}
