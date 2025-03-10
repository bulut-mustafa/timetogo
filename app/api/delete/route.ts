import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { clientConfig } from "@/firebase.config"; // Ensure this is the correct import
import { S3 } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3 = new S3({
  region: "ap-southeast-2",
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fileName = formData.get("oldFile") as string;

    


   

    // Upload new picture to S3
    try {
      await s3.deleteObject({
        Bucket: "timetogo-user-pictures",
        Key: fileName
      });
    } catch (error) {
      console.error("S3 Delete Error:", error);
      return NextResponse.json({ error: "S3 Delete failed" }, { status: 500 });
    }

    // Revalidate profile page
    revalidatePath(`/profile`, "layout");

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
