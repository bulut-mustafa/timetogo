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

export const getDestination = async (id: string): Promise<Location | null> => {
  try {
    const destinationRef = ref(database, `destinations/${id}`);
    const snapshot = await get(destinationRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.key,
      ...snapshot.val(),
    } as Location;
  } catch (error) {
    console.error('Error fetching destination from database:', error);
    throw new Error('Failed to get the destination.');
  }
};
