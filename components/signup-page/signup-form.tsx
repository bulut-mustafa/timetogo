'use client'
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm(props: any) {
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
                if (formData.password !== formData.passwordcheck) {
                    setError('Passwords do not match');
                    return;
                }
                props.onSubmit(e, formData);
            };
    return (
        <>
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
        </>
    );
}