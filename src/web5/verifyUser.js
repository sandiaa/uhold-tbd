import { openDB } from 'idb';

const verifyUser = async (userPassword) => {
  const openDatabase = async () => {
    return await openDB('UserInputDB', 1, {
      upgrade(db) {
        db.createObjectStore('userData');
      },
    });
  };

  const handleStoreData = async () => {
    try {
      const db = await openDatabase();
      const tx = db.transaction('userData', 'readwrite');
      const store = tx.objectStore('userData');
      await store.put(userPassword, 'user');
      await tx.done;
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const handleRetrieveData = async () => {
    try {
      const db = await openDatabase();
      const tx = db.transaction('userData');
      const store = tx.objectStore('userData');
      const value = await store.get('user');
      await tx.done;
      return value;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return undefined;
    }
  };

  const storedValue = await handleRetrieveData();
  if (!storedValue) {
    await handleStoreData();
    return true;
  }
  else{
   return storedValue == userPassword;
  }
};

export default verifyUser;
