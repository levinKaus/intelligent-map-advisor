import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "./Map.js";
//import savedPlaces from "./savedPlaces.js";
import { Provider } from "react-redux";
import store from "./redux/actions/store.js";
import "./index.css";
import logo from "./assets/logo.png";
import Cookies from 'js-cookie';

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

  const isLoggedIn = Cookies.get('isLoggedIn');
  const username = Cookies.get('username');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMap(true);
    setMapName(area);
    const response = await fetch('/api/generatePlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        places: [
          {
            action: placeType,
            location: area
          }
        ]
      })
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
        style={{ marginTop: "200px", marginLeft: "-70px" }}
        >
          ‧ Click to go to test APIs
        </p>
        <div>
          {isLoggedIn && isLoggedIn === true ? (
            <p>Welcome back, {username}</p>
          ) : (
            <p>Please log in to continue.</p>
          )}
        </div>
        <p
          onClick={() => {
            navigateTo("/signup");
          }}
          style={{ marginTop: "160px", marginLeft: "-54px" }}
        >
          ‧ Sign Up
        </p>
        <p
          onClick={() => {
            navigateTo("/login");
          }}
          style={{ marginTop: "0px", marginLeft: "-70px" }}
        >
          ‧ Log In
        </p>
        <div className="saved-places">
          <p
            onClick={() => setShowSavedPlaces(!showSavedPlaces)}
          >
            ‧ Saved Places
          </p>
          {/*
          {showSavedPlaces && <savedPlaces />}
          <div className="saved-places-textbox">
            {savedPlaces.map((place) => (
              <div key={place.name}>
                <p style={{ marginTop: "-15px", fontSize: "15px" }}>{`${place.name}, ${place.address}`}</p>
                <savedPlaces />
              </div>
            ))}
          </div>
          */}
        </div>
        <div className="saved-maps">
          <p style={{ marginTop: "0px", marginLeft: "-20px" }}>‧ Saved Maps</p>
          {savedMaps.map((savedMap, index) => (
            <div
              key={index}
              onClick={() => {
                setArea(savedMap.area);
                setMapName(savedMap.name);
                setShowMap(true);
              }}
            >
              <p style={{ marginTop: "-15px", fontSize: "15px" }}>{`${savedMap.name}, ${savedMap.area}`}</p>
            </div>
          ))}
        </div>
        <div className="footer-text">
          <p>
            {" "}
            Travel planner with expert guidance and personalized recommendations
            for your dream vacation.
          </p>
        </div>
      </div>
      <div className="main-content">
        {showMap ? (
          <div className="map-container" style={{ marginLeft: "-17%", marginTop: "4%" }}>
            <Provider store={store}>
              <Map
                locations={locations}
                mapName={mapName}
                setShowMap={setShowMap}
              />
            </Provider>
          </div>
        ) : showSavedPlaces ? (
          <div className="save-place-container">
            <h2>Saved Places</h2>
            <Provider store={store}>
              <savedPlaces />
            </Provider>
          </div>
        ) : (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
            <h1>Search Recommendation Places</h1>
              <div className="input-container">
                <label htmlFor="area">Where do you want to go?</label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  placeholder="Enter location"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="placeType">
                  What type of place are you looking for?
                </label>
                <input
                  type="text"
                  id="placeType"
                  name="placeType"
                  placeholder="Enter location type"
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="country">Which country?</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Search</button>
            </form>
          </div>
        )}
      </div>
    </div >
  );
}