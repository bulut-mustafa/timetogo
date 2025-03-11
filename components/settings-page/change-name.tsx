"use client";
import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { getAuth, updateProfile } from "firebase/auth";

export default function ChangeName()  {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleChangeName = async () => {
        setMessage("");

        if (!name || !lastName) {
            setMessage("Please fill in all fields.");
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

            const newDisplayName = `${name} ${lastName}`;
            // Update profile
            await updateProfile(user, { displayName: newDisplayName });
            setMessage("Name updated successfully!");
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container p-2">
            
            <div>
                <p className="p-2">Change user name</p>
            </div>
            <div>
                <Input
                    className="w-full"
                    label="Name"
                    type={"text"}
                    variant="bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mt-3">
                <Input
                    className="w-full"

                    label="Last name"
                    type={"text"}
                    variant="bordered"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="px-2">

                <Button className="mt-4 w-full" onPress={handleChangeName} isLoading={loading}>
                    Change Name
                </Button>
            </div>

            {message && <p className="mt-2 text-center text-sm text-red-500">{message}</p>}
        </div>
    );
}
