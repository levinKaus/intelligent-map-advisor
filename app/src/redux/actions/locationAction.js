import axios from 'axios';

// action types
export const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';

// action creators
export const fetchLocationsRequest = () => {
  return {
    type: FETCH_LOCATIONS_REQUEST
  };
};

export const fetchLocationsSuccess = (locations) => {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    payload: locations
  };
};

export const fetchLocationsFailure = (error) => {
  return {
    type: FETCH_LOCATIONS_FAILURE,
    payload: error
  };
};

export const fetchLocations = () => {
  return (dispatch) => {
    dispatch(fetchLocationsRequest());
    axios
      .get('/api/locations') // replace with your API endpoint
      .then((response) => {
        const locations = response.data;
        dispatch(fetchLocationsSuccess(locations));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchLocationsFailure(errorMessage));
      });
  };
};
