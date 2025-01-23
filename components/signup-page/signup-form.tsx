'use client';

import { FormEvent, useState, useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image';
import { app, auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
            await createUserWithEmailAndPassword(getAuth(app), formData.email, formData.password);
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
        <div className="h-full bg-white rounded-l-3xl w-1/3 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md p-6 gap-6">
                <Link href="/" aria-label="Home" className="flex items-center justify-center gap-8 no-underline">
                    <Image src="/logo.png" alt="Time to go" width={128} height={128} priority className="mb-6" />
                </Link>
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
    );
};

export default SignUpForm;