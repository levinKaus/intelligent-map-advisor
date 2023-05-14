import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "./Map.js";
//import savedPlaces from "./savedPlaces.js";
import { Provider } from "react-redux";
import store from "./redux/actions/store.js";
import "./index.css";
import logo from "./assets/logo.png";
import Cookies from "js-cookie";

export default function HomePage() {
  const navigateTo = useNavigate();
  const [area, setArea] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [country, setCountry] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [locations, setLocations] = useState([]);
  const [mapName, setMapName] = useState("");
  const [savedMaps] = useState([
    { name: "Map 1", area: "Paris" },
    { name: "Map 2", area: "London" },
    { name: "Map 3", area: "Rome" },
  ]); // sample list of saved maps

  const [showSavedPlaces, setShowSavedPlaces] = useState(false);

  const isLoggedIn = Cookies.get("isLoggedIn");
  const username = Cookies.get("username");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMap(true);
    setMapName(area);
    const response = await fetch("/api/generatePlaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        places: [
          {
            action: placeType,
            location: area,
          },
        ],
      }),
    });
    const data = await response.json();
    const newLocations = data.result.map((place) => ({
      name: place.address,
      lat: place.latitudelatitude,
      lng: place.longitude,
    }));
    setLocations(newLocations);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <p
          onClick={() => {
            navigateTo("/testapis");
          }}
          style={{ marginTop: "60%", marginLeft: "-23%" }}
        >
          ‧ Test APIs
          {isLoggedIn && isLoggedIn === true ? (
          <p>Welcome back, {username}</p>
        ) : (
          <p>Please log in to continue.</p>
        )}
        </p>
        <p 
          onClick={() => {
            navigateTo("/signup");
          }}
          style={{ marginTop: "-30%", marginLeft: "-33%" }}
        >
          ‧ Sign Up
        </p>
        <p
          onClick={() => {
            navigateTo("/login");
          }}
          style={{ marginTop: "-15%", marginLeft: "-41%" }}
        >
          ‧ Log In
        </p>
        <p
          onClick={() => {
            navigateTo("/savedPlace");
          }}
          style={{ marginTop: "-15%", marginLeft: "-12%" }}
        >
          ‧ Saved Places
        </p>
        <p
          onClick={() => {
            navigateTo("/savedMap");
          }}
          style={{ marginTop: "-15%", marginLeft: "-19%" }}>
          ‧ Saved Maps
        </p>
      </div>
      <div className="map-container">
        <Provider store={store}>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter place type"
                value={placeType}
                onChange={(e) => setPlaceType(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <button type="submit">Search</button>
            </div>
          </form>
          {showMap && <Map locations={locations} mapName={mapName} />}
        </Provider>
      </div>
      {showSavedPlaces && (
        <div className="saved-places-container">
          {/* <SavedPlaces savedPlaces={savedPlaces} /> */}
        </div>
      )}
    </div>
  );
}
