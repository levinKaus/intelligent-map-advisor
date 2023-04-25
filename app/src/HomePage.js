import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // import the CSS file for styling
import logo from "./assets/logo.png"; // import the logo image

export default function HomePage() {
  const navigateTo = useNavigate();

  // create state variables for the form inputs
  const [area, setArea] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [country, setCountry] = useState("");

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the form inputs, e.g. send them to an API
    console.log(area, placeType, country);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <p 
          onClick={() => {
            navigateTo("/signup");
          }}
          style={{ marginTop: "175px", marginLeft: "-65px" }}
        >
          ‧ Sign Up
        </p>
        <p
          onClick={() => {
            navigateTo("/login");
          }}
          style={{ marginTop: "10px", marginLeft: "-75px" }}
        >
          ‧ Log In
        </p>
        <p
          onClick={() => {
            navigateTo("/testapis");
          }}
          style={{ marginTop: "10px", marginLeft: "-50px" }}
        >
          ‧ Test APIs
        </p>
        <div className="footer-text">
          <p> Travel planner with expert guidance and personalized recommendations for your dream vacation. text-align: left</p>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Browse Travel Suggestions</h1>
          <div className="form-input">
            <label htmlFor="area">Area:</label>
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              style={{ width: "200px", marginBottom: "10px", border: "1px solid #ccc" }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="placeType">Place Type:</label>
            <input
              type="text"
              id="placeType"
              value={placeType}
              onChange={(e) => setPlaceType(e.target.value)}
              style={{ width: "200px", marginBottom: "10px", border: "1px solid #ccc" }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ width: "200px", marginBottom: "30px", border: "1px solid #ccc" }}
            />
          </div>
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  );
}
