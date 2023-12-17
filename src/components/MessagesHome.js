// ChatList.js

import React from 'react';
import '../styles/messagesHome.css'; // Import your CSS file for styling
import folder from '../assets/folder.png';

const MessagesHome = () => {
  const contacts = [
    { name: 'John Doe', unread: 3, image: 'user1.png' },
    { name: 'Jane Smith', unread: 1, image: 'user2.png' },
    // Add more contacts with unread messages and images
  ];

  return (
    <div className="chatListContainer">
      <h2>Chat Contacts</h2>
      <ul className="contactList">
        {contacts.map((contact, index) => (
          <li key={index} className="messageItem">
            <img src={folder} alt={contact.name} className="messageImage" />
            <div className="messageInfo">
              <div className="messageName">{contact.name}</div>
              <div className="unreadCount">{contact.unread}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesHome;
