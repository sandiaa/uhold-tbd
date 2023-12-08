// FileItem.js

import React, { useState,useEffect } from 'react';
import '../styles/fileItem.css';
import folder from '../assets/folder.png';
import fileImage from '../assets/file.png';
import FileViewer from './FileViewer';
import { useHistory } from 'react-router-dom'

const displayFile = (file) => {
  if (file.fileStore) {
    const binaryString = atob(file.fileStore);
    const byteArray = new Uint8Array(binaryString.length);
     for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: file.fileType });
    return blob;
  } else {
    return null;
  }
};

const FileItem = ({ file }) => {
  const [fileToDisplay, setFileToDisplay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory()

  const handleClick =  () => {
    if(file.fileType == 'folder'){
      history.push(`/folderView/${file.recordId}`);
        }
    else{const fileBlob =  displayFile(file);
    setFileToDisplay(fileBlob);
    setIsModalOpen(true);}
  };



  return (
    <div><div className="fileItem" onClick={handleClick}>
      <img
        src={file.fileType === 'folder' ? folder : fileImage}
        alt="folder"
        className="fileImage"
      />
      <div className="fileDetails">
        <h5 className="fileName">{file.fileName}</h5>
        <p className="fileCreatedAt">{file.createdAt}</p>
      </div>
   
    </div>
    <div>
  {isModalOpen && fileToDisplay != null && (
    <FileViewer fileBlob={fileToDisplay} onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
  )}
</div></div>
  );
};

export default FileItem;
