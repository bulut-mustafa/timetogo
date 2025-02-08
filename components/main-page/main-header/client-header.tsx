'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/login");
  }, [router]);

  useEffect(() => {
    if (!loading && user?.uid) {
      let isMounted = true; // Track component mount state

      getUser(user.uid)
        .then((data) => {
          if (isMounted) setUserInfo(data);
        })
        .catch((error) => console.error("Error fetching user info:", error));

      return () => {
        isMounted = false; 
      };
    }
  }, [user, loading]);

  if (loading || userInfo === null) {
    return (
      <>
        <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
      </>
    );
  }

  return user ? (
    <li className="flex">
      <UserDropdown user={userInfo} logOut={handleLogout} />
    </li>
  ) : (
    <>
      <li className="flex">
        <NavLink href="/login">Login</NavLink>
      </li>
      <li className="flex">
        <NavLink href="/signup">Sign Up</NavLink>
      </li>
    </>
  );
};

export default ClientHeader;
