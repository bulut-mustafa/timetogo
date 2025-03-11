'use client';

import { useState } from 'react';
import { useDisclosure } from "@heroui/react";
import { SavedReservation } from "@/lib/types";
import ReservationCard from "./reservation-card"; 
import ReservationCardSkeleton from "./reservation-card-skeleton"; 
import ViewReservation from '@/components/ui/view-res-modal';

interface ReservationProps {
    savedReservations: SavedReservation[];
    loadingReservations: boolean;
    fetchReservations: () => Promise<void>; 
}

export default function YourReservations({ savedReservations, loadingReservations, fetchReservations }: ReservationProps) {
    const [selectedReservation, setSelectedReservation] = useState<SavedReservation | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="p-2">
            {/* Show skeletons while loading */}
            {loadingReservations ? (
                <div className="grid grid-cols-1 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ReservationCardSkeleton key={index} />
                    ))}
                </div>
            ) : savedReservations.length === 0 ? (
                <p className="text-gray-500">No reservations found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {savedReservations.map((reservation) => (
                        <div key={reservation.id} onClick={() => { setSelectedReservation(reservation); onOpen(); }}>
                            <ReservationCard reservation={reservation} />
                        </div>
                    ))}
                </div>
            )}

            {/* Reservation Details Modal */}
            {selectedReservation && (
                <ViewReservation
                    reservation={selectedReservation}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    fetchReservations={fetchReservations}
                />
            )}
        </div>
    );
}
