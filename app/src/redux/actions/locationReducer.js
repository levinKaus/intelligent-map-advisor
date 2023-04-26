// Define initial state
const initialState = {
    locations: [],
    selectedLocation: null,
    loading: false,
    error: null,
  };
  
  // Define reducer function
  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_LOCATIONS_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "GET_LOCATIONS_SUCCESS":
        return {
          ...state,
          locations: action.payload,
          loading: false,
          error: null,
        };
      case "GET_LOCATIONS_FAILURE":
        return {
          ...state,
          locations: [],
          loading: false,
          error: action.payload,
        };
      case "SELECT_LOCATION":
        return {
          ...state,
          selectedLocation: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  