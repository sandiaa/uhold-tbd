import { connectToWeb5 } from './web5ConnectHelper'
import rootProtocol from './protocols/rootProtocol.json'

export const createFolder = async (folderName, rootRecord, isSubFolder) => { 
  console.log(folderName, rootRecord, isSubFolder)
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (rootRecord.recordId != null) {
      const folderData = {
        fileName: folderName,
        fileType: 'folder',
        fileStore: "",
        shared: false,
        starred:false,
        deleted:false
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
          protocolPath:  isSubFolder == true ? 'rootFolder/subFolder/subFolder/subFolder':'rootFolder/subFolder',
          schema: rootProtocol.types.subFolder.schema,
          dataFormat: rootProtocol.types.subFolder.dataFormats[0],
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
