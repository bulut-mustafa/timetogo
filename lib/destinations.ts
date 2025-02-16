'use server';
import { db } from '../firebase';
import { Location } from './types';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const getDestinations = async (): Promise<Location[]> => {
  try {
    const destinationsRef = collection(db, 'destinations'); // Reference to the collection
    const snapshot = await getDocs(destinationsRef);

    if (snapshot.empty) {
      return [];
    }

    const destinationsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return destinationsData as Location[];
  } catch (error) {
    console.error('Error fetching destinations from Firestore:', error);
    throw new Error('Failed to get the destinations.');
  }
};

export const getDestination = async (id: string): Promise<Location | null> => {
  try {
    const destinationRef = doc(db, 'destinations', id); // Reference to the document
    const snapshot = await getDoc(destinationRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Location;
  } catch (error) {
    console.error('Error fetching destination from Firestore:', error);
    throw new Error('Failed to get the destination.');
  }
};
