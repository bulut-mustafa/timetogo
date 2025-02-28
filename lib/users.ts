'use server';
import { db } from '../firebase';
import { User } from './types';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
export const addNewUser = async (user: User, userID: string) => {
  try {
    const userRef = doc(db, 'users', userID); // Get document reference
    await setDoc(userRef, {
      name: user.name,
      lastName: user.lastName,
      from: user.from || '',
      picture: user.picture || '',
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    revalidatePath('/', 'layout')
    console.log('User added to Firestore successfully!');
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
    throw new Error('Failed to add user to Firestore.');
  }
};

export async function getUser(userID: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userID); // Get document reference
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    const userData = snapshot.data();
    return {
      id: userID,
      name: userData.name,
      lastName: userData.lastName,
      from: userData.from,
      picture: userData.picture,
      email: userData.email,
      createdAt: userData.createdAt,
    } as User;
  } catch (error) {
    console.error('Error fetching user from Firestore:', error);
    throw new Error('Failed to get the user.');
  }
}
