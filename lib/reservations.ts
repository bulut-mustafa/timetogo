'use server';
import { db } from '../firebase';
import { collection, setDoc, getDoc,deleteDoc ,getDocs, doc, query, where } from "firebase/firestore"; 
import type { User, SavedReservation } from "@/lib/types";

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

export const deleteReservation = async (reservationID: string) => {
    const reservationId = `${reservationID}`;
    const reservationRef = doc(db, "reservations", reservationId);

    try {
        await deleteDoc(reservationRef);
        console.log("Reservation deleted successfully!");
    } catch (error) {
        console.error("Error deleting reservation:", error);
    }
};
export const getReservationsByDestination = async (
    userId: string,
    destinationId: string
  ): Promise<SavedReservation[]> => {
    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("userId", "==", userId), where("destinationId", "==", destinationId));
  
    try {
      const querySnapshot = await getDocs(q);
      const reservations: SavedReservation[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<SavedReservation, "id">; // Ensure "id" is not in data
        return { id: doc.id, ...data }; // Merge doc.id separately
      });
      return reservations;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
  };
  