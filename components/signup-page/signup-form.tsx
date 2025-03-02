'use client';

import { FormEvent, useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { app, auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from '../../firebase';
import { ref, set } from 'firebase/database';
import { Input } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../login-page/password-input";

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse space-y-4">
            {/* Skeleton for header */}
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            {/* Skeleton for email input */}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            {/* Skeleton for password input */}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            {/* Skeleton for button */}
            <div className="h-12 bg-blue-300 rounded w-full"></div>
        </div>
    );
};
const SignUpForm: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        passwordcheck: '',
    });
    const [error, setError] = useState<string | null>(null);

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.passwordcheck) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(app), formData.email, formData.password);
            const userRef = ref(database, `users/${userCredential.user.uid}`);
            await set(userRef, {
                name: formData.name,
                lastName: formData.lastname,
                from: '',
                picture: '',
                email: formData.email,
                createdAt: new Date().toISOString(),
            });
            router.push("/login");
        } catch (e) {
            setError((e as Error).message);
        }
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // If user is signed in, redirect to home or another page
                router.push('/');
            } else {
                // If no user is signed in, stop loading
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, [router]);


    if (loading) {
        return (
            <div className="p-6 max-w-md mx-auto">
                <SkeletonLoader />
            </div>
        );
    }
    return (
        <div className="h-full bg-white opacity-70 md:rounded-l-3xl w-full md:w-1/2 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
                <Link href="/" aria-label="Home" className="flex items-center justify-center gap-8 no-underline">
                    <Image src="/favicon.png" alt="Time to go" width={128} height={128} priority className="mb-6" />
                </Link>
                <div className="w-full">
                    <p className="text-center text-lg font-semibold mb-4">Create your account</p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Input isRequired label="Name" name='name' type="text" variant={'flat'} value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Input isRequired label="Last Name" name='lastname' type="text" variant={'flat'} value={formData.lastname} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Input isRequired label="Email" name='email' type="email" variant={'flat'} value={formData.email} onChange={handleInputChange} />

                        </div>
                        <div>
                            <Input isRequired label="Password" name='password'
                                endContent={
                                    <button
                                        aria-label="toggle password visibility"
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                variant={'flat'}
                                value={formData.password} onChange={handleInputChange}

                            />
                        </div>
                        <div>
                            <Input isRequired label="Confirm Password" name='passwordcheck'
                                endContent={
                                    <button
                                        aria-label="toggle password visibility"
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                variant={'flat'}
                                value={formData.passwordcheck} onChange={handleInputChange}

                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Sign Up
                        </button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-blue-600 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;