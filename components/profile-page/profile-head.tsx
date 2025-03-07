'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserType } from '@/lib/types';
import Image from 'next/image';
import { format } from 'path';
import EditPicture from './edit-profile-picture';
interface ProfileHeadProps {
    user: UserType | null;
    uid: string | undefined;
    userInfoLoading: boolean;
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  
export default function ProfileHead({ user, uid, userInfoLoading }: ProfileHeadProps) {
    const router = useRouter();

    useEffect(() => {
        if (!userInfoLoading && !user) {
            router.push('/login'); // Redirect to login page if no user found
        }
    }, [user, userInfoLoading, router]);

    if (userInfoLoading) {
        return (
            <div className='flex items-center gap-4 p-4 border-b border-gray-200 animate-pulse'>
                <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                <div className='flex flex-col gap-2'>
                    <div className="h-6 w-40 bg-gray-300 rounded"></div>
                    <div className="h-4 w-60 bg-gray-300 rounded"></div>
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (!user) return null; // Prevent rendering anything before redirect

    return (
        <div className='flex items-center gap-4 p-4 border-b border-gray-200'>
            <div>
                <EditPicture user={user} uid={uid}></EditPicture>
            </div>
            <div className='flex flex-col ml-4 gap-2'>
                <div>
                    <p className="text-lg font-semibold">{user.name} {user.lastName}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">since {formatDate(user.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}
