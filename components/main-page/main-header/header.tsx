'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './nav-link';
import { auth, app } from "@/firebase";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '@/context/auth-context';
import { getUser } from '@/lib/users';
import { User as UserType } from '@/lib/types';
import { User } from "@heroui/user";
import UserDropdown from './avatarDrop';


const Header: React.FC = () => {
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
      if (!loading && user?.uid) { // Wait until auth is loaded
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
  }, [user, loading]); // Re-run effect when `user` or `loading` changes

  return (
    <header className="flex justify-between items-center py-2 px-16 shadow-md">
      <Link href="/" aria-label="Home" className='flex items-center justify-center gap-8 no-underline'>
        <Image
          src="/logo.png"
          alt="Time to go"
          width={128}
          height={128}
          priority
        />
      </Link>

      {/* Navigation */}
      <nav aria-label="Main navigation">
        <ul className="list-none flex m-0 p-0 gap-6 text-xl">
          {loading || userInfoLoading ? (
            // Skeleton placeholders while loading
            <>
              <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
              <li className="flex w-20 h-6 bg-gray-200 animate-pulse rounded"></li>
            </>
          ) : (
            // Actual navigation links
            !user ? (
              <>
                <li className="flex">
                  <NavLink href="/login">Login</NavLink>
                </li>
                <li className="flex">
                  <NavLink href="/signup">Sign Up</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="flex">
                   {userInfo && <UserDropdown user={userInfo} loading={userInfoLoading} logOut={handleLogout}/>}
                </li>
              </>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
