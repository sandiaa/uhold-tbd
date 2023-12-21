import { connectToWeb5 } from './web5ConnectHelper'

export const fetchChats = async () => {

  const web5Data = await connectToWeb5()
  if (web5Data) {

    const { web5Instance, didString } = web5Data

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
