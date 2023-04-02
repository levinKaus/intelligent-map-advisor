// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignupPage from "./SignupPage";
import SignupTest from ".SignupTest";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/signupTest" element={<SignupTest />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
