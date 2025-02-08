'use client'; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getUser } from '@/lib/users';
import { User as UserType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebase';
import UserDropdown from './avatarDrop';
import NavLink from './nav-link';

const ClientHeader: React.FC = () => {
  const { user, loading } = useAuth();
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/login");
  }

  useEffect(() => {
    async function fetchUserInfo() {
      if (!loading && user?.uid) {
        try {
          const data = await getUser(user.uid);
          setUserInfo(data);
          setUserInfoLoading(false);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    }
    fetchUserInfo();
  }, [user, loading]);

  return (
    <>
      {loading || userInfoLoading ? (
        <>
          <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
          <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
        </>
      ) : !user ? (
        <>
          <li className="flex">
            <NavLink href="/login">Login</NavLink>
          </li>
          <li className="flex">
            <NavLink href="/signup">Sign Up</NavLink>
          </li>
        </>
      ) : (
        <li className="flex">
          {userInfo && <UserDropdown user={userInfo} loading={userInfoLoading} logOut={handleLogout} />}
        </li>
      )}
    </>
  );
};

export default ClientHeader;
