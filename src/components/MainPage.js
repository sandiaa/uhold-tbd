import React, { useEffect, useState } from 'react';
import '../styles/mainPage.css';
import Landing from './Landing';
import MessagesHome from './MessagesHome';
import { useDispatch } from 'react-redux';
import { setContacts } from '../helper/redux/actions/contactActions';
import { fetchContacts } from '../helper/fetchContacts';
import { setUser } from '../helper/redux/actions/userActions';
import { fetchUserDetails } from '../helper/web5ConnectHelper';

const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactsList = async () => {
      setIsLoadingContacts(true);
      try {
        const contactList = await fetchContacts();
        if (Array.isArray(contactList) && contactList.length > 0) {
          const list = await contactList[0].data.json();
          dispatch(setContacts(list));
        }
      } catch (error) {
        setError('Error fetching contacts data');
        console.error('Error fetching contacts data:', error);
      }
      setIsLoadingContacts(false);
    };

    const fetchUserData = async () => {
      setIsLoadingUser(true);
      try {
        const user = await fetchUserDetails();
        dispatch(setUser(user));
      } catch (error) {
        setError('Error fetching user details');
        console.error('Error fetching user details:', error);
      }
      setIsLoadingUser(false);
    };
 
    fetchContactsList();
    fetchUserData();
  }, [dispatch]);

  if (isLoadingContacts || isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mainPageContainer">
      <div className="landingComponent">
        <Landing />
      </div>
      <div className="chat">
        <MessagesHome />
      </div>
    </div>
  );
};

export default MainPage;
