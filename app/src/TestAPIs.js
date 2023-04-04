import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestAPIs() {
  const navigateTo = useNavigate()
  const [formData, setFormData] = useState({userID: '', name: '', longitude: '', langitude: ''});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/savePlace', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1>Test APIs</h1>
      <p
        onClick={() => {
          navigateTo("/");
        }}
      >
        Click to go to home
      </p>
      <h2>Test savePlace</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <h4>userID</h4>
        <input type="text" name="userID" value={formData.userID} onChange={(e) => setFormData({...formData, userID: e.target.value})} />
      </div>
      <div>
        <h4>Name</h4>
        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      </div>
      <div>
        <h4>Longitude</h4>
        <input type="text" name="longitude" value={formData.longitude} onChange={(e) => setFormData({...formData, longitude: e.target.value})} />
      </div>
      <div>
        <h4>Langitude</h4>
        <input type="text" name="langitude" value={formData.langitude} onChange={(e) => setFormData({...formData, langitude: e.target.value})} />
      </div>
      <button type="submit">Save Place</button>
      </form>
    </div>
  );
}