'use client'

import { useState, useEffect } from 'react';
import { getDestinations } from "@/lib/destinations";
import NewCard from "./newCard";
import SkeletonCard from "./cardSkeleton"; // Import SkeletonCard
import { Location } from "@/lib/types";

interface PopularDestinationsProps {
    filteredDestinations: Location[];
    loading: boolean
}

export default function PopularDestinations({filteredDestinations, loading }: PopularDestinationsProps) {


    return (
        <section className="px-24 py-4">
            <h2 className="mb-4 font-semibold text-lg">Most popular destinations</h2>

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
