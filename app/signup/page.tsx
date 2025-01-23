import React from 'react';
import LoginBack from '@/components/login-page/login-back';
import SignUpForm from '@/components/signup-page/signup-form';
import { Montserrat, Nunito_Sans } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-montserrat',
});

const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-nunito-sans',
});

const SignUpPage = () => {
    return (
        <>
            <LoginBack />
            <main
                className={`${montserrat.variable} ${nunitoSans.variable} font-sans h-screen flex items-center relative z-10`}
            >
                <div className="w-2/3 p-12 text-gray-800 flex flex-col justify-center items-start bg-opacity-75">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight font-[var(--font-montserrat)]">
                        Welcome, it&apos;s Time To Go
                    </h1>
                    <p className="text-xl font-light mb-4 font-[var(--font-nunito-sans)]">
                        Your journey starts here.
                    </p>
                    <p className="text-lg font-light font-[var(--font-nunito-sans)]">
                        Sign up to create your personalized dashboard and explore more.
                    </p>
                </div>
                <SignUpForm />
            </main>
        </>
    );
};

export default SignUpPage;