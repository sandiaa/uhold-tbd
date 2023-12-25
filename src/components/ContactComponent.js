import React, { useState, useEffect } from 'react'
import '../styles/contactComponent.css' // Import your CSS file for styling
import AddContact from './AddContact'
import { fetchContacts } from '../helper/fetchContacts'
import { addNewContact } from '../helper/addNewContact'
import ChatComponent from './ChatComponent'
const ContactComponent = ({ contactClose }) => {
  const [loading, setLoading] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [messageDid, setMessageDid] = useState('')
  const [newContact, setNewContact] = useState({
    contactName: '',
    contactDid: '',
    readReceiptOff: false,

  })
  const [displayContact, setDisplayContact] = useState([])
  const handleContactClick = (contact) => {
    setSelectedContact(contact)
  }
  const fetchContactsList = async () => {
    setLoading(true)
    const contactList = await fetchContacts()
    const list = await contactList[0].data.json()
    setDisplayContact(list.contacts)
    setLoading(false)
  }

  useEffect(() => {
    fetchContactsList()
  }, [])
  const copyNumber = (number) => {
    navigator.clipboard.writeText(number)
  }

  const handleAddContact = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSaveContact = () => {
    addNewContact(newContact)
    setNewContact({ contactName: '',
    contactDid: '',
    readReceiptOff: false})
    setShowModal(false)
  }

  const handleSendMessage = (e, contact) => {
    setMessageDid(contact.contactDid)
    setShowMessage(true)
  }

  const closeSendMessage = () => {
    setShowMessage(false)
  }
  return (
    <div>
      {showMessage && (
        <ChatComponent
          senderDid={messageDid}
          showMessageWindow={closeSendMessage}
        />
      )}

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ flex: 1 }}>
              <p onClick={contactClose} style={{ cursor: 'pointer' }}>
                Back
              </p>
              Contact List
              {!showModal && (
                <button onClick={handleAddContact} className="addContactButton">
                  Add Contact
                </button>
              )}
            </h3>
          </div>
          {loading? 
             <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>Loading ...</div> : null}
            
          {!loading && displayContact.length == 0 ? 
                       <div style={{display: 'flex', alignContent: 'center',
                        justifyContent: 'center'}}>No Contacts</div> : null}
                
          <ul className="contactList">
            {displayContact.map((contact, index) => (
              <li key={index} className="contactItem">
                <div
                  className="contactInfo"
                  onClick={() => handleContactClick(contact)}
                >
                  <span>{contact.contactName}</span>
                </div>
                <button
                  className="messageButton"
                  onClick={(e) => handleSendMessage(e, contact)}
                >
                  Message
                </button>
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
                  <strong>Name:</strong> {selectedContact.contactName}
                </p>
                <p className="contactDid">
                  <strong>Did:</strong> {selectedContact.contactDid}
                </p>
                <div className="buttonContainer">
                  <button
                    onClick={() => copyNumber(selectedContact.contactDid)}
                  >
                    Copy Did
                  </button>
                  <button onClick={() => setSelectedContact(null)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactComponent
