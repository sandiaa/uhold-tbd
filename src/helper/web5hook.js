import { useDispatch, useSelector } from 'react-redux';
import { setWeb5 } from './redux/actions/web5ConnectAction';
import { Web5 } from '@web5/api'
import store from "../helper/redux/store";

export const useConnectToWeb5 =  () => {

    const dispatch = useDispatch();
    const web5State = store.getState().web5.web5 
    const connectToWeb5 = async () => {
      if (Object.keys(web5State).length === 0) {
        try {
          const web5Data = await connectDwnWeb5();
          if (web5Data) {
            dispatch(setWeb5(web5Data));
          }
          return web5Data;
        } catch (error) {
          console.error('Error in connectToWeb5:', error);
          return null;
        }
      } else {
        return web5State;
      }
    };
  
    return connectToWeb5;
  };

  export const connectDwnWeb5 = async () => {
  
    try {
      const { web5, did } = await Web5.connect({
        sync: '5s'
      })
      return { web5Instance: web5, didString: did }
    } catch (error) {
      console.error('Error connecting to Web5:', error)
      return null
    }
  }