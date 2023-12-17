// ContactComponent.js

import React, { useState } from 'react';
import '../styles/contactComponent.css'; // Import your CSS file for styling

const ContactComponent = ({ contacts }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number);
  };

  return (
    <div className="parentContainerContact">
    <div className="contactListContainer" style={{ position: 'relative' }}>
      <h2>Contact List</h2>
      <ul className="contactList">
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="contactItem"
            onClick={() => handleContactClick(contact)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
      <div className={selectedContact ? 'contactDetails active' : 'contactDetails'}>
        {selectedContact && (
          <div>
            <p>
              <strong>Name:</strong> {selectedContact.name}
            </p>
            <p>
              <strong>Number:</strong> {selectedContact.number}
            </p>
            <div className="buttonContainer">
              <button onClick={() => copyNumber(selectedContact.number)}>Copy</button>
              <button onClick={() => setSelectedContact(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div></div>
  );
};

export default ContactComponent;
