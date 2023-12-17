// AddContact.js

import React, { useState } from 'react';
import '../styles/addContact.css'; // Import your CSS file for styling

const AddContact = ({ handleCloseModal, handleSaveContact, newContact, setNewContact }) => {

  return (
    <div>
      <div className="addContactModalContent">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h3>Add New Contact</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={newContact.id}
            onChange={(e) =>
              setNewContact({ ...newContact, id: e.target.value })
            }
          />
        </div>
        <button onClick={handleSaveContact}>Save Contact</button>
      </div>
    </div>
  );
};

export default AddContact;
