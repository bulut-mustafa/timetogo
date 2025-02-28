import { NextApiRequest, NextApiResponse } from "next";
import { doc, deleteDoc , getDoc} from "firebase/firestore";
import { db } from "@/firebase";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { reservationId, destination } = req.query;

  if (!reservationId || !destination) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  try {
    const reservationRef = doc(db, "reservations", String(reservationId));
    const reservationDoc = await getDoc(reservationRef);

    if (!reservationDoc.exists()) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    await deleteDoc(reservationRef);
    // Remove the subscription from the database
    

    res.status(200).send(`
      <html>
        <head><title>Unsubscribed</title></head>
        <body style="text-align: center; padding: 50px;">
          <h2>You have been unsubscribed from ${destination} flight alerts.</h2>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ message: "Error unsubscribing", error });
  }
}
