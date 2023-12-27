import { connectToWeb5 } from './web5ConnectHelper'

export const fetchPublicShared = async (recordId, fromDid) => {

  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { records } = await web5Instance.dwn.records.query({
      from: fromDid,
      message: {
        filter: {
          recordId: recordId,
        },
      },
    })
    const recordToReturn = await records[0].data.json()
    return recordToReturn
  }
}
