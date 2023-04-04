import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage"
import TestAPIs from "./TestAPIs";
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/testapi" element={<TestAPIs />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;