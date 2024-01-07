import React, { useEffect, useState } from 'react'
import '../styles/messagesHome.css'
import userImage from '../assets/owner.png'
import { fetchChats } from '../helper/fetchChats'
import ChatComponent from './ChatComponent'
import ContactComponent from './ContactComponent'
import { connect } from 'react-redux'
import { fetchContactPairSetting } from '../helper/createContactPairSetting'
const MessagesHome = ({ userDetails, contactsList }) => {
  const [chats, setChats] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [selectedDid, setSelectedDid] = useState(null)
  const [showContact, setShowContact] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    // Function to fetch and update the chat list
    const fetchAndUpdateChatList = async () => {
      try {
        setIsLoading(true)
        const list = await fetchChats()
        const transformedList = await transform(list, userDetails, contactsList)
        setChats(transformedList)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching and updating chat list:', error)
        // Handle the error appropriately
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch chat list initially
    fetchAndUpdateChatList()

    // Set up an interval to fetch chat list every 30 seconds
    const intervalId = setInterval(fetchAndUpdateChatList, 30000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [userDetails, contactsList])

  const messageOpen = (message) => {
    setSelectedDid(message.did)
    setOpenMessage(true)
    setSelectedContact(message.contactName)
  }

  const messageClose = () => {
    setOpenMessage(false)
  }

  const contactsOpen = () => {
    setShowContact(true)
  }

  const contactsClose = () => {
    setShowContact(false)
  }

  return (
    <div className="showMessageContainer">
      {openMessage ? (
        <ChatComponent
          showMessageWindow={messageClose}
          senderDid={selectedDid}
          senderName={selectedContact}
        />
      ) : showContact ? (
        <ContactComponent contactClose={contactsClose} />
      ) : (
        <div className="chatListContainer">
          <div className="chatListHeader">
            <h3>Chats</h3>
            <button style={{marginRight: '10px'}} onClick={() => {
    alert('Feature under development!')}}>Group</button>

            <button onClick={contactsOpen}>Contacts</button>
          </div>
          {loading ? (
            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              Loading ...
            </div>
          ) : null}
          {!loading && chats.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              No Chats
            </div>
          ) : null}
          {!loading && (
            <ul className="contactList">
              {chats.map((message, index) => (
                <div style={{ display: 'flex' }} key={index}>
                  <li
                    key={index}
                    className="messageItem"
                    onClick={() => messageOpen(message)}
                  >
                    <img
                      src={userImage}
                      alt={message?.did}
                      className="messageImage"
                    />
                    <div className="messageInfo">
                      <div className="messageName">
                        {message.contactName !== ''
                          ? message.contactName
                          : message.did}
                      </div>
                      {message.unread !== 0 && (
                        <div className="unreadCount">{message.unread}</div>
                      )}
                    </div>
                  </li>
                  <div key={message.did}>
                    <button
                      onClick={() => navigator.clipboard.writeText(message.did)}
                    >
                      copy did
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.user.user || {},
    contactsList: state.contacts.contacts.contacts || [],
  }
}

const transform = async (records, userDetails, contactList) => {
  // Use Promise.all to wait for all asynchronous operations to complete
  const dataList = await Promise.all(
    records.map(async (item) => {
      const data = await item.data.json()
      return {
        senderDid: data.senderDid,
        receiverDid: data.receiverDid,
        contactName: '',
        messageData: {
          recordId: item._recordId,
          message: data.message,
          read: data.read,
          createdAt: item.dateCreated,
        },
      }
    }),
  )

  const finalList = []

  const chatSetting = await fetchContactPairSetting()
  dataList.forEach((mainItem) => {
    let didToCompare = ''
    if (mainItem.senderDid !== userDetails.did) {
      didToCompare = mainItem.senderDid
    } else {
      didToCompare = mainItem.receiverDid
    }

    const index = finalList.findIndex((item) => item.did === didToCompare)

    var lastOpen = ''
    var isMessageAfterLastOpen = true
    if (chatSetting.length !== 0) {
      const contactSettingIndex = chatSetting.settings.findIndex(
        (item) => item.did === didToCompare,
      )
      if (contactSettingIndex !== -1) {
        lastOpen = chatSetting.settings[contactSettingIndex].lastMessageOpen
      }
      isMessageAfterLastOpen = checkTime(
        lastOpen !== '' ? lastOpen : '',
        mainItem.messageData.createdAt,
      )
    }

    if (index !== -1) {
      if (isMessageAfterLastOpen && mainItem.senderDid !== userDetails.did) {
        finalList[index].unread++
      }
    } else {
      let unread = 0
      if (isMessageAfterLastOpen && mainItem.senderDid !== userDetails.did) {
        unread++
      }
      var contactName = ''

      contactList.forEach((e) => {
        if (e.contactDid === didToCompare) {
          contactName = e.contactName
        }
      })
      const itemToPush = {
        did: didToCompare,
        unread: unread,
        contactName: contactName,
      }

      finalList.push(itemToPush)
    }
  })
  return finalList
}

const checkTime = (lastOpen, messageTime) => {
  // Check if lastOpen is empty
  if (lastOpen === '') {
    return true
  }

  // Convert messageTime to a Date object and then to milliseconds
  const dateObject = new Date(messageTime)
  const messageTimeMilliseconds = dateObject.getTime()

  // Compare the timestamps
  if (messageTimeMilliseconds > lastOpen) {
    return true // messageTime is after lastOpen
  } else {
    return false // messageTime is before or at the same time as lastOpen
  }
}

export default connect(mapStateToProps)(MessagesHome)
