import {  SET_CONTACTS } from './actionTypes';

export const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: contacts,
});
