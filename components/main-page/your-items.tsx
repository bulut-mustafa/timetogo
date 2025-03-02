'use client'

import { useState, useEffect, useCallback } from 'react';
import { getReservations } from "@/lib/reservations";
import NewCard from "./newCard";
import SkeletonCard from "./cardSkeleton";
import ViewReservation from "@/components/ui/view-res-modal"; // Import SaveLocation
import { useDisclosure } from "@heroui/react"; // Import modal hook
import { Location, SavedReservation } from "@/lib/types";
import { toast } from 'react-hot-toast';

interface PopularDestinationsProps {
    destinations: Location[];
    userId: string;
    loading: boolean;
}

export default function YourDestinations({ destinations, loading, userId }: PopularDestinationsProps) {
    const [savedDeals, setSavedDeals] = useState<SavedReservation[]>([]);
    const [loadingReservations, setLoadingReservations] = useState(true);
    const [selectedReservation, setSelectedReservation] = useState<SavedReservation | null>(null);

    // Modal control
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {
        if (selectedReservation) {
            onOpen(); // Open modal only when a new reservation is selected
        }
    }, [selectedReservation]);
    const fetchReservations = useCallback(async () => {
        try {
            const data = await getReservations(userId);
            setSavedDeals(data);
            setLoadingReservations(false);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }, [userId]); // ✅ Now fetchReservations stays the same unless userId changes
    
    useEffect(() => {
        fetchReservations();
    }, [userId, fetchReservations]); // ✅ Ensure it re-runs when the function updates
    


    // Function to handle opening the modal
    const handleOpenModal = (location: Location) => {
        setSelectedReservation(null); // Reset state first
        setTimeout(() => {
            const reservation = savedDeals.find(deal => deal.destinationId === location.id);
            if (reservation) {
                setSelectedReservation(reservation);
            }
        }, 0); // Ensure state update before opening modal
    };

    const savedDestinationIds = new Set(savedDeals.map(deal => deal.destinationId));
    const filteredDestinations = destinations.filter(destination => savedDestinationIds.has(destination.id));
    return (
        <section className="px-4 lg:px-8 pt-2">
            <h2 className="mb-2 sm:mb-4 font-semibold text-lg pl-2">Your Saved Destinations</h2>

            {loadingReservations ? (
                <div className="flex flex-no-wrap overflow-x-auto scrollbar-hide xl:flex-wrap mb-4 -mx-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="min-w-[250px] md:min-w-[280px] p-4 lg:w-1/4 mb-3 group">
                            <SkeletonCard />
                        </div>
                    ))}
                </div>
            ) : filteredDestinations.length === 0 ? (
                <p className="text-center text-gray-500">No saved destinations found. Start adding some.</p>
            ) : (
                <div className="flex flex-no-wrap overflow-x-auto scrollbar-hide xl:flex-wrap mb-4 -mx-3 pl-2">
                    {filteredDestinations.map((place, i) => (
                        <div key={i} className="min-w-[250px] md:min-w-[280px] p-4 lg:w-1/4 mb-3 group">
                            <NewCard
                                location={place}
                                showEyeIcon={true}
                                onEyeClick={() => handleOpenModal(place)} // Pass function
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Show modal only if a location is selected */}
            {selectedReservation && (
                <ViewReservation reservation={selectedReservation} isOpen={isOpen} onOpenChange={onOpenChange} fetchReservations={fetchReservations} />
            )}
        </section>
    );
}
