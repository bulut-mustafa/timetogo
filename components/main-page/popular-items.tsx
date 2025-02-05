'use client'

import { useState, useEffect } from 'react';
import { getDestinations } from "@/lib/destinations";
import NewCard from "./newCard";
import { Location } from "@/lib/types";

interface PopularDestinationsProps {
    search: string;
    temperature: string | null;
    type: string | null;
    averageCost: string | null;
}

export default function PopularDestinations({ search, temperature, type, averageCost }: PopularDestinationsProps) {
    const [destinations, setDestinations] = useState<Location[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<Location[]>([]);

    // Fetch data inside useEffect (NOT in an async component)
    useEffect(() => {
        async function fetchDestinations() {
            const data = await getDestinations();
            setDestinations(data);
        }
        fetchDestinations();
    }, []);

    // Filter destinations whenever state changes
    useEffect(() => {
        const filtered = destinations.filter((place) => {
            return (
                (search ? place.city.toLowerCase().includes(search.toLowerCase()) : true) &&
                (temperature ? place.temperature === temperature : true) &&
                (type ? place.type === type : true) &&
                (averageCost ? place.average_cost === averageCost : true)
            );
        });
        setFilteredDestinations(filtered);
    }, [search, temperature, type, averageCost, destinations]);

    return (
        <section className="p-24">
            <h2 className="mb-6">Most visited destinations</h2>

            {filteredDestinations.length === 0 ? (
                <p className="text-center text-gray-500">No destinations found.</p>
            ) : (
                <div className="flex flex-wrap mb-4 -mx-3">
                    {filteredDestinations.map((place, i) => (
                        <div 
                            key={i} 
                            className="w-full p-4 lg:w-1/4 sm:w-1/2 mb-3 group transform transition-all duration-300 relative hover:!opacity-100 group-hover/list:opacity-60"
                        >
                            <NewCard location={place} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
