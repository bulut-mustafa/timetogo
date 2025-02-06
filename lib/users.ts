'use server';
import { database } from '../firebase';
import { User } from './types';
import { ref, set, get } from 'firebase/database';

export const addNewUser = async (user: User, userID: string) => {
  try {
    const userRef = ref(database, `users/${userID}`);
    await set(userRef, {
      name: user.name,
      lastName: user.lastName,
      from: user.from || '',
      picture: user.picture || '',
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    console.log('User added to the database successfully!');
  } catch (error) {
    console.error('Error adding user to database:', error);
    throw new Error('Failed to add user to database.');
  }
};

export async function getUser(userID: string): Promise<User | null> {
  try {
    const userRef = ref(database, `users/${userID}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    const userData = snapshot.val();
    return {
      id: userID,
      ...userData,
    } as User;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    throw new Error('Failed to get the user.');
  }
}
