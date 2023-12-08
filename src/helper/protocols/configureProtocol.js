import rootProtocol from "./rootProtocol.json"
import {connectToWeb5} from "../web5ConnectHelper"

export const configureProtocol = async () => {
    const web5Data = await connectToWeb5()

    if (web5Data) {
    const { web5Instance, didString } = web5Data
    const { protocols, status } = await web5Instance.dwn.protocols.query({
        message: {
            filter: {
                protocol: rootProtocol.protocol,
            }
        }
    });

    if(status.code !== 200) {
        alert('Error querying protocols');
        console.error('Error querying protocols', status);
        return;
    }

    if(protocols.length > 0) {
        console.log('Protocol already exists');
        return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } = await web5Instance.dwn.protocols.configure({
        message: {
            definition: rootProtocol,
        }
    });

    console.log('Protocol configured', configureStatus, protocol);

    //configuring protocol on remote DWN
   const { status: configureRemoteStatus } = protocol.send(didString);
   console.log('Protocol configured on remote DWN', configureRemoteStatus);
}
}