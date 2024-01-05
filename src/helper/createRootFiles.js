import { connectToWeb5 } from './web5ConnectHelper'
import chatProtocol from "./protocols/chatProtocol.json"
import fileShareProtocol from "./protocols/fileShareProtocol.json"
export const createRootFiles = async () => {
 createContactFiles();
 configureChatProtocol();
 configureFileShareProtocol();
}

const createContactFiles = async () => {
    const web5Data = await connectToWeb5()
    if (web5Data) {
      const { web5Instance, didString } = web5Data
      const { records } = await web5Instance.dwn.records.query({
        message: {
          filter: {
            schema: 'https://didcomm.org/uhold/schemas/contact',
          },
        },
      })
      if (records.length == 0) {
        const {
          record: rootRecord,
          status: createStatus,
        } = await web5Instance.dwn.records.create({
          data: {
            contacts: [],
          },
          message: {
            schema: 'https://didcomm.org/uhold/schemas/contact',
          },
        })
      }
    }
}

const configureChatProtocol = async () => {
    const web5Data = await connectToWeb5()
    if (web5Data) {
      const { web5Instance, didString } = web5Data
    const { protocols, status } = await web5Instance.dwn.protocols.query({
        message: {
            filter: {
                protocol: chatProtocol.protocol,
            }
        }
    });

    if(status.code !== 200) {
        alert('Error querying chat protocol');
        console.error('Error querying protocol', status);
        return;
    }

    if(protocols.length > 0) {
        return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } = await web5Instance.dwn.protocols.configure({
        message: {
            definition: chatProtocol,
        }
    });

    console.log('chat protocol configured', configureStatus, protocol);

    //configuring protocol on remote DWN
   const { status: configureRemoteStatus } = await protocol.send(didString);
   console.log('Protocol configured on remote DWN', configureRemoteStatus);
}
}

const configureFileShareProtocol = async () => {
  const web5Data = await connectToWeb5()
  if (web5Data) {
    const { web5Instance, didString } = web5Data
  const { protocols, status } = await web5Instance.dwn.protocols.query({
      message: {
          filter: {
              protocol: fileShareProtocol.protocol,
          }
      }
  });

  if(status.code !== 200) {
      alert('Error querying fileShare protocol');
      console.error('Error querying protocol fileShare', status);
      return;
  }

  if(protocols.length > 0) {
      return;
  }

  // configure protocol on local DWN
  const { status: configureStatus, protocol } = await web5Instance.dwn.protocols.configure({
      message: {
          definition: fileShareProtocol,
      }
  });

  console.log('fileShare protocol configured', configureStatus, protocol);

  //configuring protocol on remote DWN
 const { status: configureRemoteStatus } = await protocol.send(didString);
 console.log('fileShare Protocol configured on remote DWN', configureRemoteStatus);

}}