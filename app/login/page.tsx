'use client';
import React, { useState } from 'react';
import LoginBack from '@/ui/components/login-page/login-back';
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <>
            <LoginBack></LoginBack>
            <main className='flex justify-center items-center h-screen relative z-10'>
                <div className='gap-4 bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                    <p className='text-center text-lg font-semibold mb-4'>Sign in with Email</p>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </p>
                        <p>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </p>
                    </form>
                </div>



            </main>
        </>

    );
};

export default LoginPage;