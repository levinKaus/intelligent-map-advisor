import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestAPIs() {
  const navigateTo = useNavigate()
  const [formDataSavePlace, setFormDataSavePlace] = useState({ userID: '', name: '', longitude: '', langitude: '' });
  const [formDataDeletePlace, setFormDataDeletePlace] = useState({ userID: '', name: '', longitude: '', langitude: '' });
  const [formDataGetPlaces, setFormDataGetPlaces] = useState({ userID: '' })
  const [formDataLogin, setFormDataLogin] = useState({ username: '', password: '' })
  const [formActionDataGeneratePlaces, setformActionDataGeneratePlaces] = useState()
  const [formLocationDataGeneratePlaces, setformLocationDataGeneratePlaces] = useState()



  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataLogin)
    });
    const data = await response.json();
    console.log(data);
  }

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

  const handleSubmitGetPlaces = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/getPlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataGetPlaces)
    });
    const data = await response.json();
    console.log(data);
  }

  const handleSubmitGeneratePlaces = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/generatePlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        places: [
          {
            action: formActionDataGeneratePlaces,
            location: formLocationDataGeneratePlaces
          }
        ]
      })
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


      <h2>Test login</h2>
      <form onSubmit={handleSubmitLogin}>
        <div>
          <h4>Username</h4>
          <input type="text" name="username" value={formDataLogin.userID} onChange={(e) => setFormDataLogin({ ...formDataLogin, username: e.target.value })} />
        </div>
        <div>
          <h4>Password</h4>
          <input type="text" name="password" value={formDataLogin.userID} onChange={(e) => setFormDataLogin({ ...formDataLogin, password: e.target.value })} />
        </div>
        <button type="submit">Login</button>
      </form>

      <h2>Test savePlace</h2>
      <form onSubmit={handleSubmitSavePlace}>
        <div>
          <h4>userID</h4>
          <input type="text" name="userID" value={formDataSavePlace.userID} onChange={(e) => setFormDataSavePlace({ ...formDataSavePlace, userID: e.target.value })} />
        </div>
        <div>
          <h4>Name</h4>
          <input type="text" name="name" value={formDataSavePlace.name} onChange={(e) => setFormDataSavePlace({ ...formDataSavePlace, name: e.target.value })} />
        </div>
        <div>
          <h4>Longitude</h4>
          <input type="text" name="longitude" value={formDataSavePlace.longitude} onChange={(e) => setFormDataSavePlace({ ...formDataSavePlace, longitude: e.target.value })} />
        </div>
        <div>
          <h4>Langitude</h4>
          <input type="text" name="langitude" value={formDataSavePlace.langitude} onChange={(e) => setFormDataSavePlace({ ...formDataSavePlace, langitude: e.target.value })} />
        </div>
        <button type="submit">Save Place</button>
      </form>


      <h2>Test deletePlace</h2>
      <form onSubmit={handleSubmitDeletePlace}>
        <div>
          <h4>userID</h4>
          <input type="text" name="userID" value={formDataDeletePlace.userID} onChange={(e) => setFormDataDeletePlace({ ...formDataDeletePlace, userID: e.target.value })} />
        </div>
        <div>
          <h4>Name</h4>
          <input type="text" name="name" value={formDataDeletePlace.name} onChange={(e) => setFormDataDeletePlace({ ...formDataDeletePlace, name: e.target.value })} />
        </div>
        <div>
          <h4>Longitude</h4>
          <input type="text" name="longitude" value={formDataDeletePlace.longitude} onChange={(e) => setFormDataDeletePlace({ ...formDataDeletePlace, longitude: e.target.value })} />
        </div>
        <div>
          <h4>Langitude</h4>
          <input type="text" name="langitude" value={formDataDeletePlace.langitude} onChange={(e) => setFormDataDeletePlace({ ...formDataDeletePlace, langitude: e.target.value })} />
        </div>
        <button type="submit">Delete Place</button>
      </form>

      <h2>Test getPlaces</h2>
      <form onSubmit={handleSubmitGetPlaces}>
        <div>
          <h4>userID</h4>
          <input type="text" name="userID" value={formDataGetPlaces.userID} onChange={(e) => setFormDataGetPlaces({ ...formDataGetPlaces, userID: e.target.value })} />
        </div>
        <button type="submit">Get Places</button>
      </form>

      <h2>Test generatePlaces</h2>
      <form onSubmit={handleSubmitGeneratePlaces}>
        <div>
          <h4>Search Area/Location Name</h4>
          <input type="text" name="location" value={formLocationDataGeneratePlaces} onChange={(e) => setformLocationDataGeneratePlaces(e.target.value)} />
        </div>
        <div>
          <h4>What to do:</h4>
          <input type="text" name="action" value={formActionDataGeneratePlaces} onChange={(e) => setformActionDataGeneratePlaces(e.target.value)} />
        </div>
        <button type="submit">Generate Places</button>
      </form>
    </div>
  );
}
