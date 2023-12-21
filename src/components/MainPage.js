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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContactsList = async () => {
      setIsLoading(true);
      try {
        const contactList = await fetchContacts();
        if (contactList.length !== undefined) {
          const list = await contactList[0].data.json();
          dispatch(setContacts(list));
        }
      } catch (error) {
        console.error('Error fetching contacts data:', error);
        // Handle error or dispatch an error action if needed
      }

      try {
        const user = await fetchUserDetails();
        dispatch(setUser(user));
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error or dispatch an error action if needed
      }

      setIsLoading(false);
    };

    fetchContactsList();
  }, [dispatch]);

  return (
    <div>
      {!isLoading && (
        <div className="mainPageContainer">
          <div className="landingComponent">
            <Landing />
          </div>
          <div className="chat">
            <MessagesHome />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
