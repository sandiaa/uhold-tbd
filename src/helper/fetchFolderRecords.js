import { fetchArecord } from './fetchArecord'
import { connectToWeb5 } from './web5ConnectHelper'

export const fetchFolderRecord = async (recordId) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data

    const { records } = await web5Instance.dwn.records.query({
      message: {
        filter: {
          recordId: recordId,
        },
      }, 
    })
    const folderFilesList = await records[0].data.json()
    const recordListToReturn = await Promise.all(
        folderFilesList.folderData.map(async (element) => {
          const recordFetched = await fetchArecord(element);
          return recordFetched[0];
        })
      );
      
    return recordListToReturn
      
  }
}
