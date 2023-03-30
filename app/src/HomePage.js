import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigateTo = useNavigate();
  return (
    <p 
      onClick={() => {
        navigateTo("/signup");
      }}
    >
      Click to go to sign up
    </p>
  );
}
