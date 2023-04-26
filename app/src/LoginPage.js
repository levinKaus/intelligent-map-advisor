import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import "./index.css";
import logo from "./assets/logo.png";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    const maxLengths = { username: 21, password: 61 };
    if (value.length < maxLengths[name]) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: md5(formData.password)
        }),
      });
      if (response.ok) {
        // Set cookie to indicate that the user has logged in
        document.cookie = "loggedIn=true; path=/";
        navigateTo("/");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <p
          onClick={() => {
            navigateTo("/");
          }}
          style={{ marginTop: "175px", marginLeft: "-60px" }}
        >
          ‧ Homepage
        </p>
        <p
          onClick={() => {
            navigateTo("/signup");
          }}
          style={{ marginTop: "10px", marginLeft: "-75px" }}
        >
          ‧ Sign Up
        </p>
        <div className="footer-text">
          <p>
            {" "}
            Travel planner with expert guidance and personalized recommendations
            for your dream vacation.
          </p>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-submit" onClick={() => {
            navigateTo("/");
          }}>
            Login
          </button>
          <p>New to our site? <a href="/signup">Sign up</a></p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
