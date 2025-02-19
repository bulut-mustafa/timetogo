'use server';
import { db } from '../firebase';
import { collection, setDoc, getDoc, getDocs, doc, query, where } from "firebase/firestore"; 

const RESERVATIONS_COLLECTION = "reservations";

export const addReservation = async (userId: string, userEmail: string, formData: any) => {
  try {
    const reservationId = `${userId}_${formData.destinationId}_${formData.from}`; // Custom ID
    const docRef = doc(db, RESERVATIONS_COLLECTION, reservationId);

    const reservation = {
      userId,
      userEmail,
      ...formData,
      createdAt: new Date(),
    };

    await setDoc(docRef, reservation); // Use setDoc to enforce the custom ID

    return { id: reservationId, ...reservation };
  } catch (error) {
    console.error("Error adding reservation:", error);
    throw error;
  }
};

export const getReservation = async (reservationId: string) => {
  try {
    const docRef = doc(db, RESERVATIONS_COLLECTION, reservationId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Reservation not found");
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
};

export const getReservations = async (userId: string) => {
  try {
    const q = query(collection(db, RESERVATIONS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};