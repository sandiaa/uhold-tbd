import React, { useState, useEffect } from 'react'
import '../styles/shareActionModal.css' // CSS file for styling
import { connect } from 'react-redux'

const ShareActionModal = ({ isOpen, onClose, onShare, contactlist }) => {
  const [isDropOpen, setIsDropOpen] = useState(false)
  const [isShareInPublic, setIsShareInPublic] = useState(false)
  const [selectedOption, setSelectedOption] = useState({ contactDid: '' })
  const [options, setOptions] = useState(contactlist.contacts.contacts)
  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsDropOpen(false)
  }
  const shareMe = () => {
    onShare(isShareInPublic, isShareInPublic ? '' : selectedOption.contactDid)
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modalContent">
        <h2>Share</h2>
        {!isShareInPublic && (
          <div>
            <input
              type="text"
              placeholder="Did or contact name"
              className="folderName"
              value={selectedOption.contactName}
              onChange={(e) => setSelectedOption(e.target.value)}
              onClick={() => {
                options.length > 0 ? setIsDropOpen(true) : setIsDropOpen(false)
              }}
            />
          </div>
        )}
        {isDropOpen && !isShareInPublic && (
          <div className="dropdown">
            {options.map((option) => (
              <div
                key={option.contactDid}
                onClick={() => handleOptionSelect(option)}
              >
                {option.contactName}
              </div>
            ))}
          </div>
        )}
        <button
          className={`shareInPublicButton ${isShareInPublic ? 'true' : ''}`}
          onClick={() => setIsShareInPublic(!isShareInPublic)}
        >
          Share in Public
        </button>
        <div className="buttonGroup">
          <button className="createButton" onClick={shareMe}>
            Share
          </button>
          <button className="cancelcreationButton" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    contactlist: state.contacts || {},
  }
}

export default connect(mapStateToProps)(ShareActionModal)
