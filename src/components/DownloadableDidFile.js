import React from 'react';

const DownloadBase64File = ({ base64String, fileName }) => {
  const downloadFile = () => {
    // Create a new Blob object using the Base64 string
    const blob = new Blob([base64String], { type: 'text/plain' });

    // Create a URL for the Blob object
    const fileUrl = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up and revoke the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <button onClick={downloadFile}>
      Download your DID secret file by clicking this big green button. Keep it safe so you get to login from anywhere
    </button>
  );
};

export default DownloadBase64File;
