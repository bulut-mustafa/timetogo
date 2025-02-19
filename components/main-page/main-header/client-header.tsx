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
      let isMounted = true;

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

  // Show loading only when `loading` is true
  if (loading) {
    return (
      <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
    );
  }

  // If no user is logged in, show Login and Sign Up buttons
  if (!user) {
    return (
      <>
        <li className="flex">
          <NavLink href="/login">Login</NavLink>
        </li>
        <li className="flex">
          <NavLink href="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  // If user is logged in but userInfo is still loading, just show a placeholder
  if (!userInfo) {
    return (
      <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
    );
  }

  // Render UserDropdown when user is logged in
  return (
    <li className="flex">
      <UserDropdown user={userInfo} logOut={handleLogout} />
    </li>
  );
};

export default ClientHeader;
