'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signUp, signIn } from './firebaseActions/firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { addNewUser } from './users';
import { User } from './types';

export const registerNewUser = async (user: User) => {
  const userUID = await signUp(user);  // Add the user's details to the database
  await addNewUser(user, userUID);

  revalidatePath('/', 'layout');
  redirect('/login');
  
};

export const logIn = async (email: string, password: string) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
  } catch (error) {
      console.error('Error logging in:', error);
      throw error;
  }
};

