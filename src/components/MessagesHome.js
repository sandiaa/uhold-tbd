import React, { useEffect, useState } from 'react';
import '../styles/messagesHome.css';
import folder from '../assets/folder.png';
import { fetchChats } from '../helper/fetchChats';
import ChatComponent from './ChatComponent';
import ContactComponent from './ContactComponent';

const MessagesHome = () => {
  const [chats, setChats] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedDid, setSelectedDid] = useState(null);
  const [senderMessages, setSenderMessages] = useState([]);
  const [showContact, setShowContact] = useState(false);

  const fetchChatList = async () => {
    setIsLoading(true);
    const list = await fetchChats();
    const transformedList = await transform(list);
    setChats(transformedList);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  const messageOpen = (did, messages) => {
    setSelectedDid(did);
    setSenderMessages(messages);
    setOpenMessage(true);
  };

  const messageClose = () => {
    setOpenMessage(false);
  };

  const contactsOpen = () => {
    setShowContact(true);
  };

  const contactsClose = () => {
    setShowContact(false);
  };

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
              {chats.map((groupedMessages, index) => (
                <li
                  key={index}
                  className="messageItem"
                  onClick={() =>
                    messageOpen(
                      groupedMessages[0]?.senderDid,
                      groupedMessages
                    )
                  }
                >
                  <img
                    src={folder}
                    alt={groupedMessages[0]?.did}
                    className="messageImage"
                  />
                  <div className="messageInfo">
                    <div className="messageName">
                      {groupedMessages[0]?.senderDid}
                    </div>
                    <div className="unreadCount">
                      {fetchUnreadCount(groupedMessages)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};



const transform = async (records) => {
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

  const groupedItems = dataList.reduce((grouped, item) => {
    const { senderDid } = item
    if (!grouped[senderDid]) {
      grouped[senderDid] = []
    }
    grouped[senderDid].push(item)
    return grouped
  }, {})
  return Object.values(groupedItems) // Return array of grouped messages
}

const fetchUnreadCount = (messageList) => {
  let count = 0
  messageList.forEach((element) => {
    if (!element.messageData.unread) {
      count = count + 1
    }
  })
  return count
}

export default MessagesHome
