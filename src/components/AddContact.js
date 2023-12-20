// AddContact.js

import React, { useState } from 'react'
import '../styles/addContact.css' // Import your CSS file for styling

const AddContact = ({
  handleCloseModal,
  handleSaveContact,
  newContact,
  setNewContact,
}) => {
  return (
    <div>
      <div className="addContactModalContent">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h3>Add New Contact</h3>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={newContact.contactName}
            onChange={(e) =>
              setNewContact({ ...newContact, contactName: e.target.value })
            }
          />
        </div>
        <div>
          <label>DID</label>
          <input
            type="text"
            value={newContact.contactDid}
            onChange={(e) =>
              setNewContact({ ...newContact, contactDid: e.target.value })
            }
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={newContact.readReceiptOff}
            onChange={() =>
              setNewContact({
                ...newContact,
                readReceiptOff: !newContact.readReceiptOff,
              })
            }
          />
          Check to turn off read receipt
        </label>

        <button onClick={handleSaveContact}>Save Contact</button>
      </div>
    </div>
  )
}

export default AddContact
