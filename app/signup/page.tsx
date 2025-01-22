'use client';
import React, { useState } from 'react';
import LoginBack from '@/ui/components/login-page/login-back';
import Link from 'next/link';
import Image from 'next/image';
import { registerNewUser } from '@/lib/actions';
import { User } from '@/lib/types';
import { Montserrat, Nunito_Sans } from 'next/font/google';

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


const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        passwordcheck: '',
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

        const user: User = {
            name: formData.name,
            lastName: formData.lastname,
            picture: '',
            from: '',
            email: formData.email,
            password: formData.password,
        }

        // Validate passwords match
        if (formData.password !== formData.passwordcheck) {
            setError('Passwords do not match');
            return;
        }

        setError(null); // Clear previous errors

        try {
            // Register the new user
            await registerNewUser(user);
            console.log('User registered successfully');
        } catch (err) {
            console.error('Error during sign up:', err);
            setError('Failed to sign up. Please try again.');
        }
    };
    return (
        <>
            <LoginBack></LoginBack>
            <main
                className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex items-center relative z-10`}
            >                {/* Left Section */}
                <div className="w-2/3 p-12 text-gray-800 flex flex-col justify-center items-start bg-opacity-75">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight font-[var(--font-montserrat)]">
                        Welcome, its Time To Go
                    </h1>
                    <p className="text-xl font-light mb-4 font-[var(--font-nunito-sans)]">
                        Your journey starts here.
                    </p>
                    <p className="text-lg font-light font-[var(--font-nunito-sans)]">
                        Sign up to create your personalized dashboard and explore more.
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
                            <p className="text-center text-lg font-semibold mb-4">Create your account</p>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="mail@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="passwordcheck" className="block mb-2 text-sm font-medium text-gray-900">
                                        Password Confirmation {error && <span className="text-red-500 text-sm">({error})</span>}
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordcheck"
                                        id="passwordcheck"
                                        value={formData.passwordcheck}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        required
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
            </main>
        </>
    );
};

export default SignUpPage;
