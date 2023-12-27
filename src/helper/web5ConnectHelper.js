import { Web5 } from '@web5/api'
import { Web5UserAgent } from '@web5/user-agent'
import { DidKeyMethod } from '@web5/dids'
import { stringify, parse } from 'flatted'
import { useDispatch, useSelector } from 'react-redux'
import { setWeb5 } from './redux/actions/web5ConnectAction'
import store from '../helper/redux/store'

export const connectToWeb5 = async () => {
  const web5State = store.getState().web5.web5 

  if (Object.keys(web5State).length === 0) {
    const web5Instance = await connectDwnWeb5();
    return web5Instance;
  } else {
    return web5State;
  }
};
export const connectDwnWeb5 = async () => {
  try {
    const { web5, did } = await Web5.connect({
      sync: '5s',
      techPreview: {
        dwnEndpoints: ['http://localhost:3000/'],
      },
    })
    return { web5Instance: web5, didString: did }
  } catch (error) {
    console.error('Error connecting to Web5:', error)
    return null
  }
}
export const fetchUserDetails = async () => {
  try {
    const { web5, did } = await Web5.connect({
      sync: '5s',
      techPreview: {
        dwnEndpoints: ['http://localhost:3000/'],
      },
    })
    return { did: did }
  } catch (error) {
    console.error('Error connecting to Web5:', error)
    return null
  }
}

export const fetchIsFirstLauch = async () => {
  const userAgent = await Web5UserAgent.create()
  const isFirstLaunch = await userAgent.firstLaunch()
  return isFirstLaunch
}
export const fetchVerifyUser = async (userPassword) => {
  // const userAgent = await Web5UserAgent.create()
  // let verified = false
  // await userAgent.start({ passphrase: userPassword }).then(
  //   (res) => {
  //    if(res===undefined)
  //    verified = true
  //   },
  //   (err) => {
  //     verified = false
  //   },
  // )
  // return verified;
  return true
}

export const createUserInThisAgent = async (name, password, file) => {
  console.log(password)
  // const userAgent = await Web5UserAgent.create()
  // await userAgent.start({ passphrase: password })

  // if (file == undefined) {
  // const userDid = await DidKeyMethod.create()
  // const identity = await userAgent.identityManager.import({
  //   did: userDid,
  //   identity: { did: userDid.did, name: name },
  //   kms: 'local',
  // })

  // await userAgent.identityManager.import({
  //   identity,
  //   context: userAgent.agentDid,
  // })

  const { web5, did: myDid } = await Web5.connect({
    sync: '5s',
    techPreview: { dwnEndpoints: ['http://localhost:3000/'] },
  })
  //     const jsonString = JSON.stringify(userDid)
  //     const myObject = userAgent
  // const serialized = stringify(myObject);
  // const dataToPost = {
  //   did: jsonString,
  //   agent: serialized
  // }
  //     // Encode the string to Base64
  //     const encodedBase64String = btoa(dataToPost)
  //     return encodedBase64String
  //     } else {
  //       console.log(file)
  //       const decodedString = atob(file);
  //       const jsonObject = JSON.parse(decodedString);

  //       console.log("Retrieved JSON Object:", jsonObject);
}
