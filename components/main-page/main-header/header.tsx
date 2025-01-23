import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './nav-link';
import { auth, app } from "@/firebase";
import { useRouter } from "next/navigation";
import { User as FirebaseUser } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";

interface HeaderProps {
  currentUser: FirebaseUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {

  const router = useRouter();
  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
  }
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
        <ul className='list-none flex m-0 p-0 gap-6 text-xl'>
          {!currentUser ? (
            <>
              <li className='flex'>
                <NavLink href="/login">Login</NavLink>
              </li>
              <li className='flex'>
                <NavLink href="/signup">Sign Up</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className='flex'>
                <NavLink href="/profile">Profile</NavLink>
              </li>
              <li className='flex'>
                <button onClick={handleLogout} className="text-blue-600">Log Out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
