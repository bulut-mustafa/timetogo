import React, { useState } from 'react';
import LoginBack from '@/components/login-page/login-back';
import Link from 'next/link';
import Image from 'next/image';
import { registerNewUser } from '@/lib/actions';
import { User } from '@/lib/types';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import SignUpForm from '@/components/signup-page/signup-form';
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
    
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: { name: string; lastname: string; email: string; password: string }) => {
        e.preventDefault();

        const user: User = {
            name: formData.name,
            lastName: formData.lastname,
            picture: '',
            from: '',
            email: formData.email,
            password: formData.password,
        }


        try {
            // Register the new user
            await registerNewUser(user);
            console.log('User registered successfully');
        } catch (err) {
            console.error('Error during sign up:', err);
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
                            <SignUpForm onSubmit={handleSubmit}></SignUpForm>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignUpPage;
