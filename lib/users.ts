"use client";
import { getAuth, updateProfile } from "firebase/auth";

import { S3 } from "@aws-sdk/client-s3";
const s3 = new S3({
  region: "ap-southeast-2",
});


export async function uploadPicture(imageUrl: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  // 🔹 Update Firebase Auth profile with new image URL
  await updateProfile(user, { photoURL: imageUrl });

  console.log("User profile picture updated successfully:", imageUrl);
}
