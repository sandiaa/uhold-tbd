import { Web5 } from "@web5/api";

export const connectToWeb5 = async () => {
  try {
    const { web5, did } = await Web5.connect({sync:'5s'});
    return { web5Instance: web5, didString: did };
  } catch (error) {
    console.error('Error connecting to Web5:', error);
    return null;
  }
};

export const fetchUserDetails = async () => {
  try {
    const { web5, did } = await Web5.connect({sync:'5s'});
    return { did : did};
  } catch (error) {
    console.error('Error connecting to Web5:', error);
    return null;
  }
}
