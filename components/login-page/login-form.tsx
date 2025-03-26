'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { auth } from '@/firebase';
import { Input } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./password-input";
import Link from 'next/link';
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
const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const credential = await signInWithEmailAndPassword(
                getAuth(app),
                formData.email,
                formData.password
            );
            console.log(credential)
            const idToken = await credential.user.getIdToken();

            await fetch("/api/login", {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            router.push("/");
        } catch (e) {
            setError((e as Error).message);
        }
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // If user is signed in, redirect to home
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
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button type="submit" className="w-full text-white bg-blue-500 rounded-lg p-2.5">
                Log In
            </button>
            <p className="text-sm font-light text-gray-500 font-[var(--font-nunito-sans)]">
                Don’t have an account yet?{' '}
                <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;