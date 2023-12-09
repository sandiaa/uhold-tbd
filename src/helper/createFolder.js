import { connectToWeb5 } from './web5ConnectHelper'
import { createRootFolder } from './createRootFolder'
import rootProtocol from './protocols/rootProtocol.json'

export const createFolder = async (folderName, rootRecord, isSubFolder) => { 
  const recipient1 = "did:ion:EiBtu6O7Dw-0F67nKmOC8C4xkwhYOq-3VxfWt8lEX0KhtQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiUG52Rnh4YlRDRjlRQnBJS0twQ3Nkbm50UGNra3ZUVlROTW5PMzN4dFpfRSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJFYVZkU25GcE1iN19FY2VNdmNHYVQ5cGRzcl92LVVBTjY3eGxhVTZ1VjhzIiwieSI6IjBSNkg4d1ltV29qQndMby1QY3JsdndNZl9GbW11RzRwWjNJRFJYQ3AzbU0ifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBeWIxemYxYVNtWWxDWVlFX2RJRVhpMFU1RGRaMXNxQXJURUhyQjUzZXlpUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQXAwRmYxcEZ2Q1hkUUtQY0tvNjl1SnhHOW5kd1M5NFpzRi1UOFdfRDJ3MnciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUQzNkxyeDBXNlh2c0ZBNU5mNkNpVWUxcFNlQk1kYnhMWmg2VndQU3R3UDZ3In19"
  console.log(folderName, rootRecord, isSubFolder)
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (rootRecord.recordId != null) {
      const folderData = {
        fileName: folderName,
        fileType: 'folder',
        fileStore: ""
      }
      const {
        record: folderRecord,
        status: createStatus,
      } = await web5Instance.dwn.records.create({
        data: folderData,
        message: {
          contextId: rootRecord.contextId,
          parentId: rootRecord.recordId,
          protocol: rootProtocol.protocol,
          protocolPath:  isSubFolder == true ? 'rootFolder/subFolder/subFolder':'rootFolder/subFolder',
          schema: rootProtocol.types.subFolder.schema,
          dataFormat: rootProtocol.types.subFolder.dataFormats[0],
   //       recipient : recipient1
        },
      })
      console.log( folderRecord)
      if (createStatus.code == 202) {
        return true
      } else {
        return false
      }
    }
  }
}
