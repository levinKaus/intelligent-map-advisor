import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import axios from "axios";

function SavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/saved-places`);
        setSavedPlaces(response.data.savedPlaces);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedPlaces();
  }, [userId]);

  return (
    <div className="savedplace-container">
      <h2>Saved Places</h2>
      <ul>
        {savedPlaces.map((place) => (
          <li key={place.id}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <button>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedPlaces;
