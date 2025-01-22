'use server';
import { database } from '../firebase';
import { User } from './types';
import { ref, set } from 'firebase/database';

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
