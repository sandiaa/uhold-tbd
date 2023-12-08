// SmallButton.js

import React from 'react';
import '../styles/button.css'; // CSS file for styling

const SmallButton = ({ text, onClick }) => {
  return (
    <button className="small-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SmallButton;
