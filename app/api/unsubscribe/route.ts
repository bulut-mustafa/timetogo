import { NextRequest, NextResponse } from "next/server";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const reservationId = searchParams.get("reservationId");
  const destination = searchParams.get("destination");

  if (!reservationId || !destination) {
    return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
  }

  try {
    const reservationRef = doc(db, "reservations", reservationId);
    const reservationDoc = await getDoc(reservationRef);

    if (!reservationDoc.exists()) {
      return NextResponse.json({ message: "Reservation not found" }, { status: 404 });
    }

    await deleteDoc(reservationRef);

    return new NextResponse(`
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body { text-align: center; padding: 50px; font-family: Arial, sans-serif; }
            h2 { color: #333; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; }
            a:hover { background-color: #0056b3; }
          </style>
        </head>
        <body>
          <h2>You have been unsubscribed from ${destination} flight alerts.</h2>
          <a href="https://timetogo-chi.vercel.app/">Go back to Homepage</a>
        </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" },
      status: 200,
    });

  } catch (error) {
    return NextResponse.json({ message: "Error unsubscribing", error }, { status: 500 });
  }
};
