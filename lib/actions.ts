'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signUp, signIn } from './firebaseActions/firebaseAuth';
import { addNewUser } from './users';
import { User } from './types';

export const registerNewUser = async (user: User) => {
  const userUID = await signUp(user);  // Add the user's details to the database
  await addNewUser(user, userUID);

  revalidatePath('/', 'layout');
  redirect('/login');
  
};

export const logIn = async (email: string, password: string) => {
  const user = await signIn(email, password);
  if (!user) {
    throw new Error('User not found');
  }else{
    revalidatePath('/', 'layout');
    redirect('/');
  }
}