import { db } from "./firebase"; // Import Firestore instance
import { collection, setDoc, doc } from "firebase/firestore";

const destinationsData= {
  
}

//  Function to add destinations
export default async function uploadDestinations () {
  try {
    const destinationsCollection = collection(db, "destinations");

    for (const key in destinationsData) {
      const destination = destinationsData[key];

      // Add each destination using its ID as the document ID
      await setDoc(doc(destinationsCollection, destination.id), destination);
      console.log(`Added: ${destination.city}`);
    }

    console.log("✅ All destinations added successfully!");
  } catch (error) {
    console.error("❌ Error uploading destinations: ", error);
  }
};

