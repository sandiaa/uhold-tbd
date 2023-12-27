import { SET_WEB5 } from '../actions/actionTypes';

const initialState = {
  web5: {},
};

const web5Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEB5:
      return { ...state, web5: action.payload };
    default:
      return state;
  }
};

export default web5Reducer;
