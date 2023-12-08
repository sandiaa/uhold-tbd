// FileViewer.js

import React, { useEffect } from 'react';
import '../styles/fileViewer.css';

const FileViewer = ({ fileBlob, onClose, isOpen }) => {
  useEffect(() => {
    if (fileBlob) {
      const url = URL.createObjectURL(fileBlob);
      const fileViewer = document.getElementById('fileViewer');
      fileViewer.src = url;
    }
  }, [fileBlob]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="file-viewer">
      <div className="file-modal">
        <iframe
          id="fileViewer"
          title="file-viewer"
          className="file-content"
        ></iframe>
          <button onClick={onClose} className="cancelButton">Close</button>
      </div>
    </div>
    </div>
  );
};

export default FileViewer;
