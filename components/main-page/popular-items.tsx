'use client'
import NewCard from "./newCard";
import SkeletonCard from "./cardSkeleton"; 
import { Location } from "@/lib/types";

interface PopularDestinationsProps {
    filteredDestinations: Location[];
    loading: boolean
}

export default function PopularDestinations({filteredDestinations, loading }: PopularDestinationsProps) {


    return (
        <section className="px-4 lg:px-8 pt-2">
            <h2 className="mb-4 font-semibold text-lg pl-2">Most popular destinations</h2>

            {/* Show skeletons while loading */}
            {loading ? (
                <div className="flex flex-wrap mb-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full pt-2 xl:w-1/4 md:w-1/3 sm:w-1/2 mb-3 p-2">
                            <SkeletonCard />
                        </div>
                    ))}
                </div>
            ) : filteredDestinations.length === 0 ? (
                <p className="text-center text-gray-500">No destinations found.</p>
            ) : (
                <div className="flex flex-wrap mb-4">
                    {filteredDestinations.map((place, i) => (
                        <div 
                            key={i} 
                            className="w-full pt-2 xl:w-1/4 md:w-1/3 sm:w-1/2 mb-3 p-2 "
                        >
                            <NewCard location={place} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
