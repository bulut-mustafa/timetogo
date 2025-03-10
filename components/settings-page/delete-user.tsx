"use client";
import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function DeleteUser() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const router = useRouter();

    const handleDeleteUser = async () => {
        setMessage("");

        if (!currentPassword) {
            setMessage("Please enter your password.");
            return;
        }
        setLoading(true);
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user || !user.email) {
                setMessage("No authenticated user found.");
                setLoading(false);
                return;
            }

            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update password
            await deleteUser(user);
            window.alert("Account deleted successfully!");
            router.push("/");
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="container p-2">
            <div>
                <p className="p-2">Delete your account</p>
            </div>

            <div>
                <Input
                    className="w-full"
                    label="Password"
                    placeholder="Enter your password"
                    type={"password"}
                    variant="bordered"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="p-2">

                <Button className="mt-4 w-full" color="danger" variant="bordered" onPress={handleDeleteUser} isLoading={loading}>
                    Delete account
                </Button>
            
            </div>
            {message && <p className="mt-2 text-center text-sm text-red-500">{message}</p>}
        </div>
    )
}