// lib/fetchUserData.ts
import { auth } from "../../firebase";
import { database } from '../../firebase';
import { ref, get } from 'firebase/database';
import { User } from '../types'; // Your user type for type safety

export const fetchUserData = async () => {
  const user = auth.currentUser;
  console.log(user);
  if (!user) {
    throw new Error('User is not authenticated');
  }

  try {
    // Fetch user data from Firebase Realtime Database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val() as User; // Type casting to User type
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};
