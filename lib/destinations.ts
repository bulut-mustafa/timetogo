import { database } from '../firebase';
import { Location } from './types';
import { ref, get } from 'firebase/database';

export const getDestinations = async (): Promise<Location[]> => {
  try {
    const destinationsRef = ref(database, `destinations/`);
    const snapshot = await get(destinationsRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const destinationsData = snapshot.val();
    return Object.keys(destinationsData).map((key) => ({
      id: key,
      ...destinationsData[key],
    })) as Location[];
  } catch (error) {
    console.error('Error fetching destinations from database:', error);
    throw new Error('Failed to get the destinations.');
  }
};
