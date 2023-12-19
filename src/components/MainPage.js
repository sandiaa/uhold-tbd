import React from 'react';
import '../styles/mainPage.css';
import Landing from './Landing';
import ChatComponent from './ChatComponent';
import ContactComponent from './ContactComponent';
import MessagesHome from './MessagesHome';
const MainPage = () => {
 
  return (
    <div className="mainPageContainer">
      <div className="landingComponent">
        <Landing />
      </div>
      <div className="chat">
        <MessagesHome/>
     </div>
    </div>
  );
};

export default MainPage;
