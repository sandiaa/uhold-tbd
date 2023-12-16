import { connectToWeb5 } from './web5ConnectHelper'
import rootProtocol from './protocols/rootProtocol.json'

export const createFiles = async (file, rootRecord,isSubFolder) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    if (rootRecord.recordId != null) {
        let base64Image = null;
        if (file) {
            const binaryFile = await file.arrayBuffer();
            base64Image = btoa(
                new Uint8Array(binaryFile).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
        }
      const fileData = {
        fileName: file.name,
        fileType: file.type,
        fileStore : base64Image,
        shared: false,
        starred:false,
        deleted:false
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
          protocolPath:  isSubFolder == true ? 'rootFolder/subFolder/folderFiles':'rootFolder/folderFiles',
          schema: rootProtocol.types.folderFiles.schema,
          dataFormat: rootProtocol.types.folderFiles.dataFormats[0],
        },
      })
      if (createStatus.code == 202) {
        return true
      } else {
        return false
      }
    }
  }
}
