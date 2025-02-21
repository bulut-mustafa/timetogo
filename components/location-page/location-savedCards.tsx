'use client'
import SavedCard from "./location-savedCard";
import type { User, SavedReservation } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import {useState, useEffect} from 'react';
import { Skeleton } from "@heroui/react";
import {getReservationsByDestination} from '@/lib/reservations';

export default function SavedCards({ destinationId }: { destinationId: string }) {
    const { user, loading } = useAuth();
    const [savedReservations, setSavedReservation] = useState<SavedReservation[]>([])
    const [loadingReservations, setLoadingReservations] = useState<boolean>(true); // New loading state

    useEffect(() => {
        async function fetchReservations() {
            if (!user) return;

            setLoadingReservations(true);
            try {
                const data = await getReservationsByDestination(user.uid, destinationId);
                setSavedReservation(data);
            } catch (error) {
                console.error("Failed to fetch reservations", error);
            } finally {
                setLoadingReservations(false);
            }
        }

        fetchReservations();
    }, [user, destinationId]);  

    if (!user) {
        return <p className="text-gray-500">Sign in to see your saved list.</p>;
    }

    return (
        <div>
            <p className="font-semibold my-2">Your saved list</p>
            {loadingReservations ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} className="h-24 rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {savedReservations.length > 0 ? (
                        savedReservations.map((reservation) => (
                            <SavedCard key={reservation.id} saved={reservation} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">No saved reservations yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}