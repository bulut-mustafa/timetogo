'use client';
import Image from "next/image";
import { useRef } from "react";
import {  authUser } from '@/lib/types';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import HeroModal from "../ui/modal";
const MAX_FILE_SIZE_MB = 2; // Set the max file size limit
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
interface EditPictureProps {
    user: authUser | null;
    uid: string | undefined;
}

export const EditDocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path
            d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
            fill="currentColor"
            opacity={0.4}
        />
        <path
            d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
            fill="currentColor"
        />
    </svg>
);

export const DeleteDocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path
            d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
            fill="currentColor"
        />
        <path
            d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
            fill="currentColor"
            opacity={0.399}
        />
    </svg>
);

export default function EditPicture({ user, uid }: EditPictureProps) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                alert(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please choose a smaller file.`);
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
            onOpen(); // Open modal for confirmation
        }
    };

    // Trigger file input when "Change Picture" is clicked
    const handleChangePictureClick = () => {
        fileInputRef.current?.click();
    };

    
    const handleConfirmUpload = async () => {
        if (!selectedFile || !uid) return;
    
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userID", uid);
            if(user?.photoURL){
                formData.append("oldFile", user.photoURL);
                const response = await fetch("/api/delete", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Delete failed");
            }
            //  Upload the image via API
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");
    
            //  Get the new file URL from API response
            const newImageUrl = data.fileName;
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                updateProfile(currentUser, { photoURL: newImageUrl });
            } else {
                console.error("No authenticated user found.");
            }
            
            console.log("Profile picture updated successfully!");
    
            window.location.href = "/profile"; // Refresh the profile page
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
                {user && user.photoURL ? (
                    <Image src={`https://timetogo-user-pictures.s3.amazonaws.com/${user.photoURL}`} alt={'User Picture'} width={80} height={80} className="object-cover w-full h-full rounded-full" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white bg-gray-400 rounded-full">
                        {user?.displayName
                            ? user.displayName
                                .split(" ") // Split the name by spaces
                                .map(word => word.charAt(0)) // Get the first letter of each word
                                .join("") // Join them together
                                .toUpperCase() // Convert to uppercase
                            : "N/A"}
                    </div>
                )}

                {/* Hidden file input */}
                <input type="file" ref={fileInputRef} accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />

                <Dropdown>
                    <DropdownTrigger>
                        <button className="absolute top-0 right-0 text-white p-1 rounded-full border border-black bg-gray-200 hover:bg-gray-700 transition">
                            <img src="/penEdit.svg" alt="edit" className="w-4 h-4" />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                        <DropdownItem key="edit" onPress={handleChangePictureClick}
                            startContent={<EditDocumentIcon className={iconClasses} />}>
                            Change Picture
                        </DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger"
                            startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />} >
                            Remove Picture
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <HeroModal size="md" isOpen={isOpen} onOpenChange={onClose}>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Picture Change</h2>
                    {previewUrl && (
                        <div className="flex justify-center mb-4">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                width={250}
                                height={250}
                                className="object-cover rounded-full border border-gray-300 shadow-sm"
                            />
                        </div>
                    )}
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmUpload}
                            className={`px-4 py-2 rounded-md transition-all ${isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : (
                                'Confirm'
                            )}
                        </button>
                    </div>
                </div>
            </HeroModal>

        </>
    );
}


