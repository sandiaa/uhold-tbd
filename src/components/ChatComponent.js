import React, { useEffect, useState } from 'react'
import '../styles/chatComponent.css' // CSS file for styling
import folder from '../assets/folder.png'
import { fetchIndividualChatMessages } from '../helper/fetchIndividualChatMessages'
import { sendMessages } from '../helper/sendMessage'
const ChatComponent = ({ senderDid, showMessageWindow, unReadMessages }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = (messageText) => {
   sendMessages(messageText, senderDid)
  }

  const backButtonHandler = () => {
    showMessageWindow() // Assuming showMessageWindow toggles the chat window display
  }
  const fetchChats = async () => {
    setLoading(true)
    const chatList = await fetchIndividualChatMessages(senderDid)
    setMessages(chatList)
    setLoading(false)
  }
  useEffect(() => {
    fetchChats()
  }, [])
  return (
    <div className="chatWindow">
      <div className="headerRow">
        <button onClick={backButtonHandler}>Back</button>
        <p className="senderDid">{senderDid}</p>
      </div>
      <div className="parentContainer">
        <div className="chatContainer">
          {!loading &&
          <div className="chatMessages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.senderDid === senderDid ? 'received' : 'sent'
                }`}
              >
                {message.senderDid !== senderDid ? (
                  <div className="messageContent sent">
                    <div className="messageText">{message.messageData.message}</div>
                    <img src={folder} alt="Sender" className="senderPic" />
                  </div>
                ) : (
                  <div className="messageContent received">
                    <img src={folder} alt="Receiver" className="receiverPic" />
                    <div className="messageText">{message.messageData.message}</div>
                  </div>
                )}
              </div>
            ))}
          </div>}

          <div className="inputContainer">
            <input
              type="text"
              placeholder="Type a message..."
              className="messageInput"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(e.target.value)
                  e.target.value = ''
                }
              }}
            />
            <button
              className="sendButton"
              onClick={() => {
                const messageText = document.querySelector('.messageInput')
                  .value
                sendMessage(messageText)
                document.querySelector('.messageInput').value = ''
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
