"use client";
import { useState, useEffect } from "react";
import HeroModal from "../ui/modal";
import Image from "next/image";
import axios from "axios";
import { useDisclosure } from "@heroui/react";


import { Button } from '@heroui/react'
export default function SaveLocation() {
    const { isOpen, onOpen: openImageModal, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        earliestDate: "",
        latestDate: "",
        maxPrice: "",
        minNights: "",
        maxNights: "",
        directOnly: false,
        bags: "0",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // Call the function to fetch flight deals here
    };
    return (
        <>
            <Button color="primary" onPress={openImageModal}>Listeme Ekle</Button>

            <HeroModal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <div className="p-4">
                    <h1>Save Location</h1>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4 w-full max-w-lg">
                        <div>
                            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From:</label>
                            <input
                                type="text"
                                name="from"
                                id="from"
                                value={formData.from}
                                onChange={handleChange}
                                placeholder="Departure City"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
                            <input
                                type="text"
                                name="to"
                                id="to"
                                value={formData.to}
                                onChange={handleChange}
                                placeholder="Destination City"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="earliestDate" className="block text-sm font-medium text-gray-700">Earliest Date:</label>
                                <input
                                    type="date"
                                    name="earliestDate"
                                    id="earliestDate"
                                    value={formData.earliestDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="latestDate" className="block text-sm font-medium text-gray-700">Latest Date:</label>
                                <input
                                    type="date"
                                    name="latestDate"
                                    id="latestDate"
                                    value={formData.latestDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price:</label>
                            <input
                                type="number"
                                name="maxPrice"
                                id="maxPrice"
                                value={formData.maxPrice}
                                onChange={handleChange}
                                placeholder="Max Price in USD"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="minNights" className="block text-sm font-medium text-gray-700">Min Nights:</label>
                                <input
                                    type="number"
                                    name="minNights"
                                    id="minNights"
                                    value={formData.minNights}
                                    onChange={handleChange}
                                    placeholder="Min Nights"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="maxNights" className="block text-sm font-medium text-gray-700">Max Nights:</label>
                                <input
                                    type="number"
                                    name="maxNights"
                                    id="maxNights"
                                    value={formData.maxNights}
                                    onChange={handleChange}
                                    placeholder="Max Nights"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="directOnly"
                                id="directOnly"
                                checked={formData.directOnly}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="directOnly" className="ml-2 block text-sm text-gray-900">Direct Flights Only</label>
                        </div>

                        <div>
                            <label htmlFor="bags" className="block text-sm font-medium text-gray-700">Bags:</label>
                            <select
                                name="bags"
                                id="bags"
                                value={formData.bags}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="0">0 Bags</option>
                                <option value="1">1 Bag</option>
                                <option value="2">2 Bags</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Search Flights
                        </button>
                    </form>
                </div>

            </HeroModal>
        </>
    )
}