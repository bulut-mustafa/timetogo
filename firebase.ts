// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { clientConfig } from '@/firebase.config';
// Initialize Firebase
export const app = initializeApp(clientConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);