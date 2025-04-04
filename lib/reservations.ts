'use server';
import { db } from '../firebase';
import { collection, setDoc, getDoc,deleteDoc ,getDocs, doc, query, where, updateDoc, increment } from "firebase/firestore"; 
import type { User, SavedReservation } from "@/lib/types";
import { revalidatePath } from 'next/cache';

const RESERVATIONS_COLLECTION = "reservations";

export const addReservation = async (userId: string, userEmail: string, formData: any) => {
  try {
    const reservationId = `${userId}_${formData.destinationId}_${formData.from}`; // Custom ID
    const docRef = doc(db, RESERVATIONS_COLLECTION, reservationId);

    const reservation = {
      userId,
      userEmail,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, reservation);

    const destinationRef = doc(db, "destinations", formData.destinationId);
    
    await updateDoc(destinationRef, {
      counter: increment(1) // 
    });
    revalidatePath(`/destinations/${formData.destinationId}`); // Revalidate destination page
    revalidatePath('/', 'layout')
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

export const getReservations = async (
  userId: string,
): Promise<SavedReservation[]> => {
  const reservationsRef = collection(db, "reservations");
  const q = query(reservationsRef, where("userId", "==", userId));

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

export const getAllReservations = async (): Promise<SavedReservation[]> => {
  const reservationsRef = collection(db, "reservations");

  try {
    const querySnapshot = await getDocs(reservationsRef);
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

export const deleteReservation = async (reservationID: string, destinationId: string) => {
    const reservationId = `${reservationID}`;
    const reservationRef = doc(db, "reservations", reservationId);

    try {
        await deleteDoc(reservationRef);
        const destinationRef = doc(db, "destinations", destinationId);
        await updateDoc(destinationRef, {
            counter: increment(-1) // Decrement counter
        });
        revalidatePath(`/destinations/${destinationId}`); // Revalidate destination page
        revalidatePath('/', 'layout')
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
  
export const updateReservation = async (reservationId: string, formData: any) => {
    const docRef = doc(db, RESERVATIONS_COLLECTION, reservationId);
    try {
      const reservation = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };
        await updateDoc(docRef, reservation);
        revalidatePath(`/destinations/${formData.destinationId}`); // Revalidate destination page
        revalidatePath('/', 'layout')
        console.log("Reservation updated successfully!");
    } catch (error) {
        console.error("Error updating reservation:", error);
    }
}