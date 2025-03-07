import { NextResponse } from "next/server";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Import your Firestore instance

import { S3 } from "@aws-sdk/client-s3";
const s3 = new S3({
  region: "ap-southeast-2",
});


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const userID = formData.get("userID") as string;

        if (!file || !userID) {
            return NextResponse.json({ error: "Missing file or userID" }, { status: 400 });
        }

        const extension = file.name.split(".").pop();
        const fileName = `${userID}-img.${extension}`;
        const bufferedImage = await file.arrayBuffer();

        // Upload to S3
        try {
            await s3.putObject({
                Bucket: "timetogo-user-pictures",
                Key: fileName,
                Body: Buffer.from(bufferedImage),
                ContentType: file.type,
            });
        } catch (error) {
            console.error("S3 Upload Error:", error);
            return NextResponse.json({ error: "S3 upload failed" }, { status: 500 });
        }
        // Update Firestore with the new image file name
        const userRef = doc(db, "users", userID);
        await updateDoc(userRef, { picture: fileName });

        return NextResponse.json({ success: true, fileName });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
