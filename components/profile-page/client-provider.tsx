'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import { SavedReservation } from '@/lib/types';
import { getReservations } from "@/lib/reservations";
import { useRouter } from 'next/navigation';
import ProfileHead from './profile-head';
import { Tabs, Tab } from "@heroui/react";
import YourReservations from './your-reservations';

export default function ClientProviderProfile() {
    const { user, loading } = useAuth();
    
    
    const [savedReservations, setSavedReservations] = useState<SavedReservation[]>([]);
    const [loadingReservations, setLoadingReservations] = useState<boolean>(true);

    const router = useRouter();

    // Redirect to main page if no user
    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [loading, user, router]);


    
    const fetchReservations = useCallback(async () => {
        if (!user?.uid) return;
        try {
            const data = await getReservations(user.uid);
            setSavedReservations(data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoadingReservations(false);
        }
    }, [user?.uid]);

    useEffect(() => {
        fetchReservations(); 
    }, [fetchReservations]);

    return (
        <>
            <ProfileHead user={user} uid={user?.uid} userInfoLoading={loading} />
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options" variant='underlined'>
                    <Tab key="reservations" title="Your Reservations">
                        <YourReservations 
                            savedReservations={savedReservations}
                            loadingReservations={loadingReservations}
                            fetchReservations={fetchReservations}
                        />
                    </Tab>
                    {/* <Tab key="deals" title="Passed Deals">
                    </Tab> */}
                </Tabs>
            </div>
        </>
    );
}
