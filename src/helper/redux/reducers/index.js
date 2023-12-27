import { combineReducers } from 'redux'
import contactsReducer from './contactReducers'
import userReducer from './userReducer'
import web5Reducer from './web5ConnectReducer'
const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: userReducer,
  web5: web5Reducer,
})

export default rootReducer
