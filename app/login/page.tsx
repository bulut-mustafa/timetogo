'use client';

import React, { useState } from 'react';
import LoginBack from '@/components/login-page/login-back';
import Link from 'next/link';
import Image from 'next/image';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import { logIn } from '@/lib/actions';
// Import Google Fonts
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'], // Include only necessary font weights
    variable: '--font-montserrat', // CSS variable for easy usage
});

const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    weight: ['400', '600'], // Include only necessary font weights
    variable: '--font-nunito-sans',
});

const LoginPage: React.FC = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await logIn(formData.email, formData.password);
        } catch (err) {
            console.error('Error during sign in:', err);
            setError('Failed to sign in. Please try again.');
        }
    }

    return (
        <>
            <LoginBack></LoginBack>
            <main
                className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex items-center relative z-10`}
            >
                {/* Left Section */}
                <div className="w-2/3 p-12 text-gray-800 flex flex-col justify-center items-start bg-opacity-75">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight font-[var(--font-montserrat)]">
                        Welcome Back
                    </h1>
                    <p className="text-xl font-light mb-4 font-[var(--font-nunito-sans)]">
                        Your journey continues here.
                    </p>
                    <p className="text-lg font-light font-[var(--font-nunito-sans)]">
                        Sign in to access your personalized dashboard and explore more.
                    </p>
                </div>

                {/* Right Section */}
                <div className="h-full bg-white rounded-l-3xl w-1/3 flex items-center justify-center">
                    <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
                        {/* Logo */}
                        <Link href="/" aria-label="Home" className='flex items-center justify-center gap-8  no-underline'>
                            <Image
                                src="/logo.png"
                                alt="Time to go"
                                width={128}
                                height={128}
                                priority
                                className="mb-6"
                            />
                        </Link>

                        {/* Login Form */}
                        <div className="w-full">
                            <p className="text-center text-lg font-semibold mb-4 font-[var(--font-nunito-sans)]">
                                Sign in with Email
                            </p>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 font-[var(--font-nunito-sans)]"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="mail@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 font-[var(--font-nunito-sans)]"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="text-right">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-blue-500 hover:underline font-[var(--font-nunito-sans)]"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                {error && <span className="text-red-500 text-sm">({error})</span>}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-[var(--font-nunito-sans)]"
                                >
                                    Sign in
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
                        </div>
                    </div>
                </div>
            </main>
        </>

    );
};

export default LoginPage;
