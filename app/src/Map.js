import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "./redux/actions/locationAction.js";
import "./index.css";

const containerStyle = {
  width: "800px",
  height: "400px",
  borderRadius: "15px",
  marginTop: "-60px",
  marginLeft: "-30px",
};

const center = {
  lat: 13.736717,
  lng: 100.523186,
};

function Map({ formLocationDataGeneratePlaces }) {
  const [formActionDataGeneratePlaces] = useState("");
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector(
    (state) => state.locations
  );

  const [resultList, setResultList] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    if (locations.length > 0) {
      setResultList(
        locations.slice(0, 5).map((location) => ({
          name: location.name,
          address: location.address,
        }))
      );
    }
  }, [locations]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback(map) { }, []);

  const handleSaveClick = (address) => {
    // Add the address to the selectedLocations array
    setSelectedLocations((prevSelectedLocations) => [...prevSelectedLocations, address]);
  };

  const handleSaveAllClick = () => {
    const allAddresses = resultList.map((result) => result.address);
    setSelectedLocations(allAddresses);
  };

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
    setPlacesData(data);
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location) => (
            <Marker
              key={location.address}
              position={{ lat: location.latitude, lng: location.longitude }}
            />
          ))}
          {placesData.map((place) => (
            <Marker
              key={place.id}
              position={{ lat: place.latitude, lng: place.longitude }}
            />
          ))}
        </GoogleMap>
      ) : loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <></>
      )}
      <div className="result-container">
        <h3>&nbsp;&nbsp;Results:</h3>
        <ul>
          {resultList.map((result, index) => (
            <li key
              ={index}>
              <div>
                <p>
                  <strong>Name:</strong> {result.name}
                </p>
                <p>
                  <strong>Address:</strong> {result.address}
                </p>
              </div>
              <div>
                <button onClick={() => handleSaveClick(result.address)}>
                  Save
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="result-buttons">
          <button onClick={() => handleSaveAllClick()}>Save All</button>
          <form onSubmit={handleSubmitGeneratePlaces}>
            <input
              type="text"
              placeholder="Action (e.g. eat, drink, visit)"
              required
            />
            <input type="text" placeholder="Location (e.g. Bangkok)" required />
            <button type="submit">Generate Places</button>
          </form>
        </div>
        {selectedLocations.length > 0 && (
          <div>
            <h3>Saved Locations:</h3>
            <ul>
              {selectedLocations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;




