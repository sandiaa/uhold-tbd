import { connectToWeb5 } from './web5ConnectHelper'
import { fetchContacts } from './fetchContacts'
export const addNewContact = async (data) => {
  const contactRecord = await fetchContacts()
  const list = await contactRecord[0].data.json()
  const dataToBeUpdated = list.contacts
  dataToBeUpdated.push(data)
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { status } = await contactRecord[0].update({
      data: { contacts: dataToBeUpdated },
    })
    console.log("added contact", status)
  }

}
