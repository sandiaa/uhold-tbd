import { connectToWeb5 } from './web5ConnectHelper'

export const fetchIndividualChatMessages = async (receiverDid) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { records: userChats } = await web5Instance.dwn.records.query({
      from: receiverDid,
      message: {
        filter: {
          protocol: 'https://didcomm.org/uhold/uholdChat',
          protocolPath: 'message',
          recipient: receiverDid,
          author: didString,
        },
      },
    })
    const { records: senderChats } = await web5Instance.dwn.records.query({
      from: didString,
      message: {
        filter: {
          protocol: 'https://didcomm.org/uhold/uholdChat',
          protocolPath: 'message',
          recipient: didString,
          author: receiverDid,
        },
      },
    })
    markMessagesRead(senderChats)
    const trasnformedlist = await transformChatToDisplay(userChats, senderChats)
    return trasnformedlist
  }
}

const transformChatToDisplay = async (userChats, senderChats) => {
  const completeList = [...userChats, ...senderChats]
  const chatMessages = []
  if (completeList.length !== 0) {
    const transformedDataList = await Promise.all(
      completeList.map(async (item) => {
        const data = await item.data.json()
        // Check if data.deleted is false before adding to transformedDataList

        return {
          recordId: item._recordId,
          createdAt: item.dateCreated,
          senderDid: data.senderDid,
          receiverDid: data.receiverDid,
          messageData: {
            message: data.message,
            read: data.read,
          },
        }
      }),
    )

    // Filter out null values before pushing to dataList
    const filteredDataList = transformedDataList.filter((item) => item !== null)

    chatMessages.push(...filteredDataList)
    const sortedMessages = chatMessages.slice().sort((a, b) => {
        // Convert the date strings to actual Date objects for comparison
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
      
        // Compare the dates
        return dateA - dateB;
      });
    return sortedMessages
  }
}

const markMessagesRead = async (senderMessages) => {

  senderMessages.forEach(async (record) => {
    const web5Data = await connectToWeb5()
    const { web5Instance, didString } = web5Data
    const recordData = await record.data.json()
    if (!recordData.read) {
      const data = {
        message: recordData.message,
        read: true,
        senderDid: recordData.senderDid,
        receiverDid: recordData.receiverDid,
      }
      console.log(record._recordId)
      const { records } = await web5Instance.dwn.records.query({
        from: didString,
        message: {
          filter: {
            recordId: record._recordId,
          },
        },
      })
     console.log(data)
    const { status } = await records[0].update({ data: { message: recordData.message,
        read: true,
        senderDid: recordData.senderDid,
        receiverDid: recordData.receiverDid} })
    console.log(status)
    }
  })
}
