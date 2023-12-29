import { connectToWeb5 } from './web5ConnectHelper'

export const binFileDelete = async (recordId) => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const response = await web5Instance.dwn.records.delete({
      message: { recordId: recordId },
    })
  }
}

export const fileExpiryChecker = (date) => {
  const givenDate = new Date(date)
  const currentDate = new Date()
  const differenceInMilliseconds = currentDate - givenDate
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
  if (differenceInDays >= 30) {
    return true
  }
  return false
}
