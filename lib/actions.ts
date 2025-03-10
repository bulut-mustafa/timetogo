'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInWithEmailAndPassword ,updateProfile,createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '@/firebase';
import { User } from './types';

export const registerNewUser = async (user: User) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    // Get the created user
    const newUser = userCredential.user;

    // Set display name and picture in Firebase Auth
    await updateProfile(newUser, {
      displayName: `${user.name} ${user.lastName}`,
      photoURL: user.picture || "",
    });

    // No need to add user to Firestore; Auth already tracks email, displayName, photoURL, createdAt
    console.log("User registered successfully:", newUser);

    revalidatePath('/', 'layout');
    redirect('/login');
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign up.");
  }
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

