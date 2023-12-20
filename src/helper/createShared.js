import { connectToWeb5 } from './web5ConnectHelper'

export const createShared = async (fileRecordId, recipientDid, isPublic) => {
  const web5Data = await connectToWeb5()
  const recDid =
    'did:ion:EiC373BdE1PXNdFQQLTSSOBbTWS6pndyJA_o-lwzhnmY7Q:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiUEZLY0g2czlvQ1htVy01WWJFZm1Cd0FScDFSNnBTWENyRFpEMTc2UVJuSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiIxUUNJZXpKZDFKQ01ud244anV1aGJIWVJMeFgzeVpndkV5MHRqSWRHdk5nIiwieSI6ImVLejBRcnduQ2ZsTHhjNnlZMHBCS29aakowcWkxLXlPTnJlUnRVZVEwWDAifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlCcTcwWTlPQ2tCdEpsVkdabzFSUDl4MEJpSEZPYTBTeWdHUFk5dDlvTU5kZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGNLRFc2LUpmNXQzZ0h1Z3k3MmxsUFVveTNsazVVU3BuZDVxVGMyelFyS0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUFXMzgwNDEzR011RFVoeU1oeXQzTWF3OGpvd0ZydlZZZGktNjdGT2NVaVZBIn19'

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
      const { record } = await web5Instance.dwn.records.write({
        data: dataToShare,
        message: {
          protocol: 'https://didcomm.org/uhold/uholdShare',
          protocolPath: 'file',
          schema: 'https://didcomm.org/uhold/schemas/fileShare',
          dataFormat: 'application/json',
          recipient: recDid,
        },
      })
      const { status: filesharestatus } = await record.send(recDid)
      console.log('filesharestatus', filesharestatus)
    }
  }
}
