import { connectToWeb5 } from './web5ConnectHelper'

export const fetchRootFiles = async (rootId) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data

const { records } = await web5Instance.dwn.records.query({
  message: {
    filter: {
      parentId:rootId
    },
  },
})

return records
  }
}