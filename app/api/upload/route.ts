import { NextResponse } from "next/server";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Import your Firestore instance

import { S3 } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
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
        const timestamp = Date.now();
        const fileName = `${userID}-${timestamp}.${extension}`;
        const bufferedImage = await file.arrayBuffer();

        const userRef = doc(db, "users", userID);
        const snapshot = await getDoc(userRef);
        const userData = snapshot.data();
        if( userData!.picture ) {
            try {
                await s3.deleteObject({
                    Bucket: "timetogo-user-pictures",
                    Key: userData!.picture
                });
            } catch (error) {
                console.error("S3 Delete Error:", error);
                return NextResponse.json({ error: "S3 delete failed" }, { status: 500 });
            }
        }
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
       
        await updateDoc(userRef, { picture: fileName });
        revalidatePath(`/profile`, "layout");
        return NextResponse.json({ success: true, fileName });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
