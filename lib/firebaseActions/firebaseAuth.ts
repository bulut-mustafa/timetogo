"use server";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export async function signIn(email: string, password: string){
  try {
    console.log("Logging in signIn:", email);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in: ",userCredential.user);
    return userCredential.user; // Only return the UID
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in.");
  }
}

export async function checkState(): Promise<string | null> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });
}
