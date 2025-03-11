'use client';
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { authUser } from '@/lib/types';
import { useDisclosure } from "@heroui/react";
import { getAuth, updateProfile } from "firebase/auth";
import HeroModal from "../ui/modal";

const MAX_FILE_SIZE_MB = 2; 
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface EditPictureProps {
    user: authUser | null;
    uid: string | undefined;
}

export default function EditPicture({ user, uid }: EditPictureProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle file selection
    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.size <= MAX_FILE_SIZE_BYTES) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
            onOpen();
        } else {
            alert(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please choose a smaller file.`);
        }
    }, [onOpen]);

    const handleConfirmUpload = async () => {
        if (!selectedFile || !uid) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userID", uid);

            if (user?.photoURL) {
                formData.append("oldFile", user.photoURL);
                await fetch("/api/delete", { method: "POST", body: formData });
            }

            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");

            const auth = getAuth();
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { photoURL: data.fileName });
            }

            location.reload();
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
            onClose();
        }
    };

    return (
        <>
            <div className="relative w-20 h-20 overflow-hidden ml-2">
                {user?.photoURL ? (
                    <Image 
                        src={`https://timetogo-user-pictures.s3.amazonaws.com/${user.photoURL}`} 
                        alt="User Picture" 
                        width={80} 
                        height={80} 
                        className="object-cover w-full h-full rounded-full" 
                        loading="lazy"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-gray-400 rounded-full">
                        {user?.displayName?.split(" ").map(w => w[0]).join("").toUpperCase() || "N/A"}
                    </div>
                )}

                <input type="file" ref={fileInputRef} accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
            </div>

            <HeroModal size="md" isOpen={isOpen} onOpenChange={onClose}>
                <button onClick={handleConfirmUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Confirm"}
                </button>
            </HeroModal>
        </>
    );
}
