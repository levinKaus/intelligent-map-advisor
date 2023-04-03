import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigateTo = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <p
        onClick={() => {
          navigateTo("/");
        }}
      >
        Click to go to home
      </p>
    </div>
  );
}