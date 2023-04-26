import { combineReducers } from 'redux';
import locationReducer from '../redux/actions/locationReducer.js';

const rootReducer = combineReducers({
  locations: locationReducer,
});

export default rootReducer;
