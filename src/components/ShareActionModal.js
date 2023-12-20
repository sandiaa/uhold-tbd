
import React, { useState } from 'react';
import '../styles/shareActionModal.css'; // CSS file for styling

const ShareActionModal = ({ isOpen, onClose, onCreate }) => {

  
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modalContent">
        <h2>Create Folder</h2>
        <input
          type="text"
          placeholder="Folder Name"
          className="folderName"
        />
       
        <div className="buttonGroup">
          <button className="createButton">Create</button>
          <button className="cancelcreationButton">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShareActionModal;
