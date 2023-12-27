import { connectToWeb5 } from '../web5ConnectHelper'

export const configureBrandProtocol = async (brandProtocolId, brandDid) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data

    const {
      records: responseRec,
      status,
    } = await web5Instance.dwn.records.query({
      from: brandDid,
      message: {
        filter: {
          recordId: brandProtocolId,
        },
      },
    })

    const protocolToConfigure = await responseRec[0].data.json()
    const {
      status: configureStatus,
      protocol,
    } = await web5Instance.dwn.protocols.configure({
      message: {
        definition: protocolToConfigure.protocol,
      },
    })
    if (configureStatus.code == 202) {
      const fileData = {
        fileName: 'brand2',
        fileStore: {
          protocol: protocolToConfigure.protocol.protocol,
        },
        fileType: 'brand',
      }
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
        const { status: configureRemoteStatus } = await protocol.send(didString)
        return true
      } else {
        return false
      }
    }
  }
  return false
}
