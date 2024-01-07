import { connectToWeb5 } from './web5ConnectHelper'

export const fetchMyDid = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
   return didString;
  }
}
