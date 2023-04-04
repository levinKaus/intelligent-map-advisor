import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestAPIs() {
  const navigateTo = useNavigate()
  const [formDataSavePlace, setFormDataSavePlace] = useState({userID: '', name: '', longitude: '', langitude: ''});
  const [formDataDeletePlace, setFormDeletePlace] = useState({userID: '', name: '', longitude: '', langitude: ''});

  const handleSubmitSavePlace = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/savePlace', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataSavePlace)
    });
    const data = await response.json();
    console.log(data);
  }

  const handleSubmitDeletePlace = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/deletePlace', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataDeletePlace)
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
      <form onSubmit={handleSubmitSavePlace}>
      <div>
        <h4>userID</h4>
        <input type="text" name="userID" value={formDataSavePlace.userID} onChange={(e) => setFormDataSavePlace({...formDataSavePlace, userID: e.target.value})} />
      </div>
      <div>
        <h4>Name</h4>
        <input type="text" name="name" value={formDataSavePlace.name} onChange={(e) => setFormDataSavePlace({...formDataSavePlace, name: e.target.value})} />
      </div>
      <div>
        <h4>Longitude</h4>
        <input type="text" name="longitude" value={formDataSavePlace.longitude} onChange={(e) => setFormDataSavePlace({...formDataSavePlace, longitude: e.target.value})} />
      </div>
      <div>
        <h4>Langitude</h4>
        <input type="text" name="langitude" value={formDataSavePlace.langitude} onChange={(e) => setFormDataSavePlace({...formDataSavePlace, langitude: e.target.value})} />
      </div>
      <button type="submit">Save Place</button>
      </form>


      <h2>Test deletePlace</h2>
      <form onSubmit={handleSubmitDeletePlace}>
      <div>
        <h4>userID</h4>
        <input type="text" name="userID" value={formDataDeletePlace.userID} onChange={(e) => setFormDeletePlace({...formDataDeletePlace, userID: e.target.value})} />
      </div>
      <div>
        <h4>Name</h4>
        <input type="text" name="name" value={formDataDeletePlace.name} onChange={(e) => setFormDeletePlace({...formDataDeletePlace, name: e.target.value})} />
      </div>
      <div>
        <h4>Longitude</h4>
        <input type="text" name="longitude" value={formDataDeletePlace.longitude} onChange={(e) => setFormDeletePlace({...formDataDeletePlace, longitude: e.target.value})} />
      </div>
      <div>
        <h4>Langitude</h4>
        <input type="text" name="langitude" value={formDataDeletePlace.langitude} onChange={(e) => setFormDeletePlace({...formDataDeletePlace, langitude: e.target.value})} />
      </div>
      <button type="submit">Delete Place</button>
      </form>
    </div>
  );
}