import { connectToWeb5 } from './web5ConnectHelper'
import rootProtocol from './protocols/rootProtocol.json'
import { fetchArecord } from './fetchArecord'
export const createFiles = async (file, rootRecord, isSubFolder) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (rootRecord.recordId != null) {
      let base64Image = null
      if (file) {
        const binaryFile = await file.arrayBuffer()
        base64Image = btoa(
          new Uint8Array(binaryFile).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        )
      }
      const fileData = {
        fileName: file.name,
        fileType: file.type,
        fileStore: base64Image,
        shared: false,
        starred: false,
        deleted: false,
        sharedBy: '',
      }

      if (isSubFolder) {
        const {
          record: folderRecord,
          status: createStatus,
        } = await web5Instance.dwn.records.create({
          data: fileData,
          message: {
            schema: rootProtocol.types.folderFiles.schema,
            dataFormat: rootProtocol.types.folderFiles.dataFormats[0],
          },
        })
        const parentFolderRecord = await fetchArecord(rootRecord.recordId)
        const folderRecordData = await parentFolderRecord[0].data.json()
        folderRecordData.folderData.push(folderRecord._recordId)

        const response = await parentFolderRecord[0].update({
          data: folderRecordData,
        })

        if (createStatus.code === 202) {
          return true
        } else {
          return false
        }
      }
      const {
        record: fileRecord,
        status: createStatus,
      } = await web5Instance.dwn.records.create({
        data: fileData,
        message: {
          contextId: rootRecord.contextId,
          parentId: rootRecord.recordId,
          protocol: rootProtocol.protocol,
          protocolPath: 'rootFolder/folderFiles',
          schema: rootProtocol.types.folderFiles.schema,
          dataFormat: rootProtocol.types.folderFiles.dataFormats[0],
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
