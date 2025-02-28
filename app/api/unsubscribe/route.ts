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
        <head><title>Unsubscribed</title></head>
        <body style="text-align: center; padding: 50px;">
          <h2>You have been unsubscribed from ${destination} flight alerts.</h2>
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
