import { combineReducers } from 'redux';
import contactsReducer from './contactReducers';
import userReducer from './userReducer';
const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: userReducer
});

export default rootReducer;
