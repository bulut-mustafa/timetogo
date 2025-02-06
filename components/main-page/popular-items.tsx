'use client'

import { useState, useEffect } from 'react';
import { getDestinations } from "@/lib/destinations";
import NewCard from "./newCard";
import SkeletonCard from "./cardSkeleton"; // Import SkeletonCard
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
    const [loading, setLoading] = useState(true);

    // Fetch data inside useEffect (NOT in an async component)
    useEffect(() => {
        async function fetchDestinations() {
            try {
                const data = await getDestinations();
                setDestinations(data);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            } finally {
                setLoading(false);
            }
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
        <section className="px-24 py-8">
            <h2 className="mb-6">Most visited destinations</h2>

            {/* Show skeletons while loading */}
            {loading ? (
                <div className="flex flex-wrap mb-4 -mx-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-full p-4 lg:w-1/4 sm:w-1/2 mb-3">
                            <SkeletonCard />
                        </div>
                    ))}
                </div>
            ) : filteredDestinations.length === 0 ? (
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
