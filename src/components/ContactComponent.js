import React, { useState } from 'react'
import '../styles/contactComponent.css' // Import your CSS file for styling
import AddContact from './AddContact'
const ContactComponent = ({ contacts }) => {
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', id: '' })

  const handleContactClick = (contact) => {
    setSelectedContact(contact)
  }

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number)
  }

  const handleAddContact = () => {
    console.log("Adddd")
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSaveContact = () => {
    // Add logic to save the new contact (newContact) to your data source (e.g., contacts array)
    // For example:
    // contacts.push(newContact);
    // Clear the form fields and close the modal
    setNewContact({ name: '', id: '' })
    setShowModal(false)
  }

  return (
    <div className="parentContainerContact">
      
      <div className="addContact">
            {/* AddContact component rendering */}
        {showModal && (
          <AddContact
            handleCloseModal={handleCloseModal}
            handleSaveContact={handleSaveContact}
            setNewContact={setNewContact}
            newContact={newContact}
          />
        )}

        </div>
      <div className="contactListContainer" style={{ position: 'relative' }}>
        <h2>
          Contact List
          <button onClick={handleAddContact} className="addContactButton">
            Add Contact
          </button>
        </h2>
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


        {/* Display selected contact details */}
        <div
          className={
            selectedContact ? 'contactDetails active' : 'contactDetails'
          }
        >
          {selectedContact && (
            <div>
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Number:</strong> {selectedContact.number}
              </p>
              <div className="buttonContainer">
                <button onClick={() => copyNumber(selectedContact.number)}>
                  Copy
                </button>
                <button onClick={() => setSelectedContact(null)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactComponent
