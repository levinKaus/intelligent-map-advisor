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

function Map() {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector(
    (state) => state.locations
  );

  const [resultList, setResultList] = useState([]);
  const [map, setMap] = useState(null);

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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleSaveClick = (address) => {
    // Implement your save logic here
    console.log(`Saved address: ${address}`);
  };

  const handleSaveAllClick = () => {
    // Implement your save all logic here
    console.log("Save all clicked");
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
            <li key={index}>
              {result.name}{" "}
              <button onClick={() => handleSaveClick(result.address)}>
                Save
              </button>
            </li>
          ))}
        </ul>
        <button className="save-all-button" onClick={handleSaveAllClick}>
          Save All
        </button>
      </div>
    </div>
  );
}

export default Map;
