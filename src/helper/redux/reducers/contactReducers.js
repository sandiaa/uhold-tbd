import { SET_CONTACTS } from '../actions/actionTypes';

const initialState = {
  contacts: [],
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

export default contactsReducer;
