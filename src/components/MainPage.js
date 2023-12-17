import React from 'react';
import '../styles/mainPage.css';
import Landing from './Landing';
import ChatComponent from './ChatComponent';
import ContactComponent from './ContactComponent';
import MessagesHome from './MessagesHome';
const MainPage = () => {
 
        const contacts = [
          { name: 'John Doe' },
          { name: 'Jane Smith' },
          { name: 'Alex Johnson' },
          { name: 'John Doe' },
          { name: 'John Doe' },
          { name: 'Jane Smith' },
          { name: 'Alex Johnson' },
          { name: 'John Doe' },    { name: 'John Doe' },
          { name: 'Jane Smith' },
          { name: 'Alex Johnson' },
          { name: 'John Doe' },    { name: 'John Doe' },
          { name: 'Jane Smith' },
          { name: 'Alex Johnson' }, { name: 'John Doe' },    { name: 'John Doe' },
          { name: 'Jane Smith' },
          { name: 'Alex Johnson' },
       
        ];
  return (
    <div className="mainPageContainer">
      <div className="landingComponent">
        <Landing />
      </div>
      <div className="chat">
<ContactComponent contacts={contacts}/>      </div>
    </div>
  );
};

export default MainPage;
