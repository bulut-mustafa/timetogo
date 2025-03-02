import React from 'react';
import LoginBack from '@/components/login-page/login-back';
import LoginForm from '@/components/login-page/login-form';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
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
    return (
        <>
            <LoginBack />
            <main
                className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex items-center relative z-10`}
            >
                {/* Left Section */}
                <div className="hidden w-1/2 p-12 text-gray-800 md:flex flex-col justify-center items-start bg-opacity-75">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight font-[var(--font-montserrat)]">
                        Welcome Back
                    </h1>
                    <p className="text-xl font-light mb-4 font-[var(--font-nunito-sans)]">
                        Your journey continues here.
                    </p>
                </div>

                {/* Right Section */}
                <div className="h-full bg-white opacity-70 md:rounded-l-3xl w-full md:w-1/2 flex items-center justify-center">
                    <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
                        {/* Logo */}
                        <Link href="/" aria-label="Home" className='flex items-center justify-center gap-8  no-underline'>
                            <Image
                                src="/favicon.png"
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
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default LoginPage;