import rootProtocol from './protocols/rootProtocol.json'
import { connectToWeb5 } from './web5ConnectHelper'
import { configureProtocol } from './protocols/configureProtocol'

export const createRootFolder = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data

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
        return {recordId:records[0]._recordId,contextId : records[0]._contextId
      }
    }
  }}
  }
