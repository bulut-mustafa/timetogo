'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

import Link from 'next/link';
const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="mail@example.com"
                    required
                    className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>
            {/* Password Input */}
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Submit Button */}
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