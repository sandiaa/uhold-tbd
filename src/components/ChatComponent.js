import React, { useState } from 'react';
import '../styles/chatComponent.css'; // CSS file for styling
import folder from '../assets/folder.png';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user' },
    { text: 'Hi there!', sender: 'other' },
  ]);

  const sendMessage = (messageText) => {
    setMessages([...messages, { text: messageText, sender: 'user' }]);
  };

  return (
    <div className="parentContainer">
      <div className="chatContainer">
        <div className="chatMessages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'user' ? null : (
                <img src={folder} alt="Receiver" className="receiverPic" />
              )}
              <div className="messageContent">
                <div className="messageText">{message.text}</div>
              </div>
              {message.sender === 'user' ? (
                <img src={folder} alt="Sender" className="senderPic" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Type a message..."
            className="messageInput"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            className="sendButton"
            onClick={() => {
              const messageText = document.querySelector('.messageInput').value;
              sendMessage(messageText);
              document.querySelector('.messageInput').value = '';
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
