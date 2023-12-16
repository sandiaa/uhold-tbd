import { connectToWeb5 } from './web5ConnectHelper'
import rootProtocol from './protocols/rootProtocol.json'

export const createShared = async (fileRecordId) => {
  const web5Data = await connectToWeb5()
  const reciDid =
    'did:ion:EiB8JxnI0EQbOT1W22aIVs8JNp15n1TexMeeFIeeUnS6zA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiR0xMSEE4aEN0RGEyQnNPUHI3cnlTYXpoanpMdGx5V3FDSUwxTkRKelZGYyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ0WVpUQ0tReDNSWjRCeXlkQjhEMXlBRXN5RlA0ZXRPTjBaQTQ3aWh6TW44IiwieSI6IkVNWC1rVkxpSUJEbjBlb09JODZsZEJlV2Jpb2p6SURXTGVqZm1LaUtodmMifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBUUdFV2pYYVFxN0lucjdFQmczblc2dnk3ZlhxT3VINW9tQWktRjBZTE1odyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQ2ExU3VLX0xLUmlSbUVJVlR6U2pxYkdaczg5SEZDY05lXzE1dERSc0VFNmciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURSOF9TNjZMbG9oT3NKZWlhMzdyRklCakFRWGdKdlMwUE1KaEhFM193UVVnIn19'
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (fileRecordId != null) {
      const { records } = await web5Instance.dwn.records.query({
        from: reciDid,
        message: {
          filter: {
            dataFormat: 'application/json',
          },
        },
      })
      console.log(records[0].author == reciDid)
      console.log(records[0])

      if (records[0].published != true) {
        const { status } = await records[0].update({ published: true })
        console.log(status)
        if (status.code == 202) {
          const { records } = await web5Instance.dwn.records.query({
            message: {
              filter: {
                recordId: fileRecordId,
              },
            },
          })
          console.log(records[0])
        }
      }
    }
  }
}
//   const { recordsw } = await web5Instance.dwn.records.query({
//     message: {
//       filter: {
//         dataFormat : "application/json"
//       },
//     },
//   })

//   console.log(recordsw)
//  const response = await folderRecord.update({ data: "Hello', I'm updated" });

//   if (createStatus.code == 202) {
//     return true
//   } else {
//     return false
//   }
