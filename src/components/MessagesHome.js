import React, { useEffect, useState } from 'react'
import '../styles/messagesHome.css'
import folder from '../assets/folder.png'
import { fetchChats } from '../helper/fetchChats'
import ChatComponent from './ChatComponent'
import ContactComponent from './ContactComponent'
import { connect } from 'react-redux'

const MessagesHome = ({userDetails}) => {
  const [chats, setChats] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [selectedDid, setSelectedDid] = useState(null)
  const [user, setUser] = useState(userDetails)
  const [showContact, setShowContact] = useState(false)

  const fetchChatList = async () => {
    setIsLoading(true)
    const list = await fetchChats()
    const transformedList = await transform(list,userDetails)
    setChats(transformedList)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchChatList()
  }, [])

  const messageOpen = (did) => {
    setSelectedDid(did)
    setOpenMessage(true)
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
        />
      ) : showContact ? (
        <ContactComponent contactClose={contactsClose} />
      ) : (
        <div className="chatListContainer">
          <div className="chatListHeader">
            <h3>Chats</h3>
            <button onClick={contactsOpen}>Contacts</button>
          </div>

          {!loading && (
            <ul className="contactList">
              {chats.map((message, index) => (
                <li
                  key={index}
                  className="messageItem"
                  onClick={() => messageOpen(message?.did)}
                >
                  <img
                    src={folder}
                    alt={message?.did}
                    className="messageImage"
                  />
                  <div className="messageInfo">
                    <div className="messageName">{message?.did}</div>
                    {message.unread !== 0 && (
                      <div className="unreadCount">{message.unread}</div>
                    )}
                  </div>
                </li>
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
  }
}

const transform = async (records, userDetails) => {
  const dataList = []
  // Use Promise.all to wait for all asynchronous operations to complete
  await Promise.all(
    records.map(async (item) => {
      const data = await item.data.json()

      // Check if data.deleted is false before adding to transformedDataList
      const transformedItem = {
        senderDid: data.senderDid,
        receiverDid: data.receiverDid,
        messageData: {
          recordId: item._recordId,
          message: data.message,
          read: data.read,
          createdAt: item.dateCreated,
        },
      }
      dataList.push(transformedItem)
    }),
  )
  const finalList = []
  dataList.forEach((mainItem) => {
    let didToCompare = ''
    if (mainItem.senderDid !== userDetails.did) {
      didToCompare = mainItem.senderDid
    } else {
      didToCompare = mainItem.receiverDid
    }

    const index = finalList.findIndex((item) => item.did === didToCompare)

    if (index !== -1) {
      if (!mainItem.messageData.read && mainItem.senderDid !== userDetails.did) {
        finalList[index].unread++
      }
    } else {
      let unread = 0
      if (!mainItem.messageData.read && mainItem.senderDid !== userDetails.did) {
        unread++
      }
      const itemToPush = {
        did: didToCompare,
        unread: unread,
      }
      finalList.push(itemToPush)
    }
  })
  return finalList

}


export default connect(mapStateToProps)(MessagesHome)
