'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { logIn } from '@/lib/actions';
import { auth } from '@/firebase';
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
            console.log('Logging in:', formData);
            await logIn(formData.email, formData.password);
        } catch (err) {
            console.error('Login error:', err);
            setError('Failed to log in. Please check your credentials.');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User logged in via onAuthStateChanged:', user);
                router.push('/');
            } else {
                console.log('No user detected (logged out).');
            }
        });
    
        // Cleanup the listener
        return unsubscribe;
    }, [router]);

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