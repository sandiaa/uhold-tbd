import { connectToWeb5 } from '../web5ConnectHelper'

export const configureBrandProtocol = async (brandProtocolLink) => {
  const web5Data = await connectToWeb5()

  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const dingerProtocolDefinition = {
      protocol: 'https://blackgirlbytes.dev/dinger-chat-protocol',
      published: true,
      types: {
        ding: {
          schema: 'https://blackgirlbytes.dev/ding',
          dataFormats: ['application/json'],
        },
      },
      structure: {
        ding: {
          $actions: [
            { who: 'anyone', can: 'write' },
            { who: 'author', of: 'ding', can: 'read' },
            { who: 'recipient', of: 'ding', can: 'read' },
          ],
        },
      },
    }

    //     // configure protocol on local DWN
    const {
      status: configureStatus,
      protocol,
    } = await web5Instance.dwn.protocols.configure({
      message: {
        definition: dingerProtocolDefinition,
      },
    })
    if (configureStatus.code == 202) {
      const fileData = {
        fileName: 'brand2', 
        fileStore: {
        protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
        schema: "https://blackgirlbytes.dev/ding"},
        fileType: "brand"
      }
      console.log(fileData)
      const {
        record: fileRecord,
        status: createStatus,
      } = await web5Instance.dwn.records.create({
        data: fileData,
        message: {
          schema: 'https://didcomm.org/uhold/schemas/brand',
        },
      })
      if (createStatus.code == 202) {
        console.log('Protocol configured', configureStatus, protocol)
        return true
      }
    }
    //     //configuring protocol on remote DWN
    //    const { status: configureRemoteStatus } = protocol.send(didString);
    //    console.log('Protocol configured on remote DWN', configureRemoteStatus);
  }
  return false
}
