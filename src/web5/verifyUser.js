import {Web5UserAgent} from '@web5/user-agent'  
import { Web5 } from '@web5/api';


export const verifyUser = async (userPassphrase) => {
    const agentOption = 
    { agentDid :"did:key:z6Mkuw53Eju434FdJMR1ZPvrHAQVorr5X9Zdim5zpNPZM8xW"
   }

const agent = await Web5UserAgent.create(agentOption);
await agent.start({passphrase : "sandiaa100"}).then(res =>{
 console.log("yes")
},(err)=>{
 console.log("nooo")
})
const { web5, did: sandiaaDid } = await Web5.connect({
   
   
          })

          console.log(web5.agent.agentDid == agentOption.agentDid)
console.log("============================================")
}