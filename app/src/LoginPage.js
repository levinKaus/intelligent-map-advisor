import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import logo from "./assets/logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
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
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn-submit">
            Login
          </button>
          <p>New to our site? <a href="/signup">Sign up</a></p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
