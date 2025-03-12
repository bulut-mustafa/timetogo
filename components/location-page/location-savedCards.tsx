'use client'
import SavedCard from "./location-savedCard";
import type { User, SavedReservation, Location } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import { useState, useEffect, useCallback } from 'react';
import { Skeleton } from "@heroui/react";
import { getReservationsByDestination } from '@/lib/reservations';
import { useDisclosure } from "@heroui/react"; // Import modal hook
import ViewReservation from "@/components/ui/view-res-modal"; // Import SaveLocation
import SaveLocation from "./location-saveLocation";
export default function SavedCards({ location }: { location: Location }) {
    const { user, loading } = useAuth();
    const [savedReservations, setSavedReservation] = useState<SavedReservation[]>([])
    const [loadingReservations, setLoadingReservations] = useState<boolean>(true);
    const [selectedReservation, setSelectedReservation] = useState<SavedReservation | null>(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if (selectedReservation) {
            onOpen();
        }
    }, [selectedReservation]);


    const fetchReservations = useCallback(async () => {
        if (!user) return;
        try {
            const data = await getReservationsByDestination(user.uid, location.id);
            setSavedReservation(data);
            setLoadingReservations(false);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }, [user?.uid]);

    useEffect(() => {
        fetchReservations();
    }, [user?.uid, fetchReservations]);


    const handleOpenModal = (reservation: SavedReservation) => {
        setSelectedReservation(null); // Reset first to force re-render
        setTimeout(() => {
            setSelectedReservation(reservation);
            onOpen(); // Open modal AFTER state update
        }, 0);
    };


    if (!user) {
        return <p className="text-gray-500">Sign in to see your saved list.</p>;
    }

    return (
        <div>
            <div className="flex justify-between">
                <p className="font-semibold m-2">Your saved list</p>
                <SaveLocation location={location} onSave={fetchReservations} />
            </div>
            {loadingReservations ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} className="h-24 rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                    {savedReservations.length > 0 ? (
                        savedReservations.map((reservation) => (
                            <SavedCard
                                key={reservation.id}
                                saved={reservation}
                                handleOpenModal={() => handleOpenModal(reservation)} // Pass the correct reservation
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">No saved reservations yet.</p>
                    )}
                </div>
            )}

            {selectedReservation && (
                <ViewReservation
                    key={selectedReservation.id}
                    reservation={selectedReservation}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    fetchReservations={fetchReservations}
                />
            )}
        </div>
    );
}