import { connectToWeb5 } from './web5ConnectHelper'
export const binFileDelete = async (recordList) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    recordList.forEach(async (element) => {
      console.log(element.createdAt)
      console.log(element.recordId)
      const givenDate = new Date(element.createdAt)
      const currentDate = new Date()

      const differenceInMilliseconds = currentDate - givenDate

      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
      const e = element.recordId
      if (differenceInDays <= 30) {
        const { records } = await web5Instance.dwn.records.query({
          message: {
            filter: {
              recordId: e,
            },
          },
        })

        if (records.length > 0) {
          const record = records[0]
          const response = await web5Instance.dwn.records.delete({
            message: { record },
          })
        } else {
          console.error('No records found to delete')
        }
      }
    })
  }
}
