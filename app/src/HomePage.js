import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigateTo = useNavigate()

  return (
    <div>
      <h1>Home</h1>
      <p
        onClick={() => {
          navigateTo("/signup");
        }}
      >
        Click to go to sign up
      </p>
      <p
        onClick={() => {
          navigateTo("/login");
        }}
      >
        Click to go to login
      </p>
      <p
        onClick={() => {
          navigateTo("/testapis");
        }}
      >
        Click to go to test APIs
      </p>
    </div>
  );
}