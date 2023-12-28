import { connectToWeb5 } from './web5ConnectHelper'
import rootProtocol from './protocols/rootProtocol.json'
import { fetchArecord } from './fetchArecord'
export const createFolder = async (folderName, rootRecord, isSubFolder) => {
  console.log(folderName, rootRecord, isSubFolder)
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (rootRecord.recordId != null) {
      const folderData = {
        fileName: folderName,
        fileType: 'folder',
        fileStore: '',
        shared: false,
        starred: false,
        deleted: false,
        sharedBy: '',
        folderData: []
      }

      if (isSubFolder) {
        const {
          record: folderRecord,
          status: createStatus,
        } = await web5Instance.dwn.records.create({
          data: folderData,
          message: {
            schema: rootProtocol.types.subFolder.schema,
            dataFormat: rootProtocol.types.subFolder.dataFormats[0],
          },
        })
       const parentFolderRecord = await fetchArecord(rootRecord.recordId)
       const folderRecordData = await parentFolderRecord[0].data.json()
       folderRecordData.folderData.push(folderRecord._recordId)
 
       const response = await parentFolderRecord[0].update({ data: folderRecordData });

       if (createStatus.code === 202) {
        return true
      } else {
        return false
      }
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
          protocolPath: 'rootFolder/subFolder',
          schema: rootProtocol.types.subFolder.schema,
          dataFormat: rootProtocol.types.subFolder.dataFormats[0],
        },
      })
      if (createStatus.code === 202) {
        return true
      } else {
        return false
      }
    }
  }
}
