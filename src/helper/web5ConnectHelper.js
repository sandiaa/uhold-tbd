import { Web5 } from "@web5/api";

export const connectToWeb5 = async () => {
  try {
    const { web5, did } = await Web5.connect();
    return { web5Instance: web5, didString: did };
  } catch (error) {
    console.error('Error connecting to Web5:', error);
    return null;
  }
};

