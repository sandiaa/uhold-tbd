import { connectToWeb5 } from './web5ConnectHelper'

export const fetchChats = async () => {
    const recDid = "did:ion:EiC373BdE1PXNdFQQLTSSOBbTWS6pndyJA_o-lwzhnmY7Q:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiUEZLY0g2czlvQ1htVy01WWJFZm1Cd0FScDFSNnBTWENyRFpEMTc2UVJuSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiIxUUNJZXpKZDFKQ01ud244anV1aGJIWVJMeFgzeVpndkV5MHRqSWRHdk5nIiwieSI6ImVLejBRcnduQ2ZsTHhjNnlZMHBCS29aakowcWkxLXlPTnJlUnRVZVEwWDAifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlCcTcwWTlPQ2tCdEpsVkdabzFSUDl4MEJpSEZPYTBTeWdHUFk5dDlvTU5kZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGNLRFc2LUpmNXQzZ0h1Z3k3MmxsUFVveTNsazVVU3BuZDVxVGMyelFyS0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUFXMzgwNDEzR011RFVoeU1oeXQzTWF3OGpvd0ZydlZZZGktNjdGT2NVaVZBIn19"

  const web5Data = await connectToWeb5()
  if (web5Data) {

    const { web5Instance, didString } = web5Data

const { record } = await web5Instance.dwn.records.write({
  data: {message:"hello this is my 2 text message",read:false,senderDid: didString, receiverDid: recDid, opened:false},
  message: {
    protocol: "https://didcomm.org/uhold/uholdChat",
    protocolPath: 'message',
    schema: "https://didcomm.org/uhold/schemas/chat",
    dataFormat : "application/json",
    recipient: recDid

  },
})
const { status: ss } = await record.send(recDid)
const { status: protoRecordSendstatus } = await record.send(recDid)
    const { records } = await web5Instance.dwn.records.query({
      from: didString,
      message: {
        filter: {
          protocol: 'https://didcomm.org/uhold/uholdChat',
          protocolPath: 'message',
          schema: 'https://didcomm.org/uhold/schemas/chat',
          dataFormat: 'application/json',
        },
      },
    })
    return records;
  }
}
