import { connectToWeb5 } from './web5ConnectHelper'

export const createContactPairSetting = async (did) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { records } = await web5Instance.dwn.records.query({
      message: {
        filter: {
          schema: 'https://didcomm.org/uhold/schemas/chatSetting',
        },
      },
    })

    if (records.length == 0) {
      const {
        record: chatSetting,
        status: createStatus,
      } = await web5Instance.dwn.records.create({
        data: {
          settings: [],
        },
        message: {
          schema: 'https://didcomm.org/uhold/schemas/chatSetting',
        },
      })
    } else {
      const list = await records[0].data.json()
      const dataToBeUpdated = list.settings
      const index = dataToBeUpdated.findIndex((item) => item.did === did)

      if (index !== -1) {
        dataToBeUpdated[index] = {
          ...dataToBeUpdated[index],
          lastMessageOpen: Date.now(),
        }
      } else {
        const dataToPush = {
          did: did,
          lastMessageOpen: Date.now(),
        }
        dataToBeUpdated.push(dataToPush)
      }
      const { status } = await records[0].update({
        data: { settings: dataToBeUpdated },
      })
    }
  }
}

export const fetchContactPairSetting = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { records } = await web5Instance.dwn.records.query({
      message: {
        filter: {
          schema: 'https://didcomm.org/uhold/schemas/chatSetting',
        },
      },
    })
    var dataToReturn = []
    if(records.length > 0)
     dataToReturn = await records[0].data.json()
    
    return dataToReturn
  }
}
