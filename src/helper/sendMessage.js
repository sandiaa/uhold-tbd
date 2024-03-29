import { connectToWeb5 } from './web5ConnectHelper'

export const sendMessages = async (message, receiverDid) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data

    const { record } = await web5Instance.dwn.records.write({
        data: {message:message,read:false,senderDid: didString, receiverDid: receiverDid,opened:false},
        message: {
          protocol: "https://didcomm.org/uhold/uholdChat",
          protocolPath: 'message',
          schema: "https://didcomm.org/uhold/schemas/chat",
          dataFormat : "application/json",
          recipient: receiverDid
        },
      })
      const { status: recordSendstatus } = await record.send(receiverDid)
      const { status: recordSendtoMyDWNstatus } = await record.send(didString)

      console.log("recordSendstatus",recordSendstatus)
  }
}