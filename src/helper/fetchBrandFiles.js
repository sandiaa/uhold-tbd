import { connectToWeb5 } from './web5ConnectHelper'

export const fetchBrandFiles = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const {
      records: responseRec,
      status,
    } = await web5Instance.dwn.records.query({
      from: didString,
      message: {
        filter: {
          schema: 'https://didcomm.org/uhold/schemas/brand',
        },
      },
    })
    if (status.code == 200) {
      return responseRec
    } else return []
  }
}

export const fetchIndividualBrand = async (data) => {
  console.log(data)
  const web5Data = await connectToWeb5()

  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const {
      records: responseRec,
      status,
    } = await web5Instance.dwn.records.query({
      from: didString,
      message: {
        filter: {
          protocol: data.protocol,
          schema: data.schema,
        },
      },
    })
    return responseRec
  }
}
