import { connectToWeb5 } from './web5ConnectHelper'

export const fetchShared = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { records } = await web5Instance.dwn.records.query({
      from: didString,
      message: {
        filter: {
          protocol: 'https://didcomm.org/uhold/uholdShare',
          protocolPath: 'file',
          recipient: didString,
        },
      },
    })
    if (records.length != 0) {
      return records
    } else {
      return []
    }
  }
}
