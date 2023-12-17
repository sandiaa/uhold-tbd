import rootProtocol from './protocols/rootProtocol.json'
import { connectToWeb5 } from './web5ConnectHelper'
import { configureProtocol } from './protocols/configureProtocol'

export const createRootFolder = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const recDid = 'did:ion:EiCKrGk7gPU7rhiSpP-vLYpOSIcis5x1yHdokDS7DegkEg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoibGNTQ2VDTVhTaWUyUTRvY3N4WWZwQl9iYjY0V3pCN3JSaU5zSWU4U0FTQSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJmbjhSbXE3XzRYVWhVbFB6Y1RCcmdIVlhEWHpRaWVJaWxoaURiM3NCVlBZIiwieSI6Iko4XzAxcTJGQXN4RDdldFI3WU9IQVBPalRqVHdYYUlxYldOM19DLWVHT3MifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEaVRoclBoQm9WYTZPTWxLbkFQS1lsTW83RTlqaGtYUy1TQUNzYmdBU3RtdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQk9wZ0pQLUlTMjhIekloLTV2aTVkVjhocHhESmprYVQwZjlUcUZxRlBFLVEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNEQy1KMGFLa29pc25fSjRVbEhaVm82bU5Ga1RxbWp0UTJzTzV2ZVN0b0pBIn19'

    const { records } = await web5Instance.dwn.records.query({
      message: {
        filter: {
          protocol: rootProtocol.protocol,
          protocolPath: 'rootFolder',
        },
      },
    })
    if (records.length == 0) {
      await configureProtocol()
      const {
        record: rootRecord,
        status: createStatus,
      } = await web5Instance.dwn.records.create({
        data: {
          location: 'root',
        },
        message: {
          protocol: rootProtocol.protocol,
          protocolPath: 'rootFolder',
          schema: rootProtocol.types.rootFolder.schema,
          dataFormat: rootProtocol.types.rootFolder.dataFormats[0],
        },
      })
      return createStatus.code == 200 ? {recordId : rootRecord._recordId , contextId : rootRecord._contextId} : null;
    } else {
      const locationRecord = await records[0].data.json()

      if (locationRecord.location == 'root') {
        console.log('Root already exists')
        return {recordId:records[0]._recordId,contextId : records[0]._contextId
      }
    }
  }}
  }
