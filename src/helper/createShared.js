import { connectToWeb5 } from './web5ConnectHelper'

export const createShared = async (fileRecordId, isPublic, recipientDid) => {
  console.log("fff")
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (fileRecordId != null) {
      const { records } = await web5Instance.dwn.records.query({
        message: {
          filter: {
            recordId: fileRecordId,
          },
        },
      })

      const dataToShare = await records[0].data.json()
      if (!isPublic) {
        const { record } = await web5Instance.dwn.records.write({
          data: dataToShare,
          message: {
            protocol: 'https://didcomm.org/uhold/uholdShare',
            protocolPath: 'file',
            schema: 'https://didcomm.org/uhold/schemas/fileShare',
            dataFormat: 'application/json',
          },
        })
        const { status: filesharestatus } = await record.send(recipientDid)
        const { status: filetoMyDWNstatus } = await record.send(didString)
      } else {
        const { record } = await web5Instance.dwn.records.write({
          data: dataToShare,
          message: {
            dataFormat: 'application/json',
            published: true,
          },
        })
        const { status: filesend } = await record.send(didString)
      }
    }
  }
}
