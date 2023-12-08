
import React, { useState } from 'react';
import '../styles/createFolder.css'; // CSS file for styling

const CreateFolder = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');

  const handleCreate = () => {

    if (folderName.trim() !== '') {
      onCreate(folderName);
      setFolderName(''); // Clear input field
      onClose();
    }
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modalContent">
        <h2>Create Folder</h2>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder Name"
          className="folderName"
        />
          <label  className="checkBoxStore">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
       Check to store this file in your device
      </label>
        <div className="buttonGroup">
          <button onClick={handleCreate} className="createButton">Create</button>
          <button onClick={onClose} className="cancelcreationButton">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
