import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './nav-link';
const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center py-2 px-16 shadow-md">
            <Link href="/" aria-label="Home" className='flex items-center justify-center gap-8  no-underline'>
                <Image
                    src="/logo.png"
                    alt="Time to go"
                    width={128}
                    height={128}
                    priority
                />
            </Link>
            {/* Navigation */}
            <nav aria-label="Main navigation" >
                <ul className='list-none flex m-0 p-0 gap-6 text-xl'>
                    <li className='flex'>
                        <NavLink href="/login">Login</NavLink>
                    </li>
                    <li className='flex'>
                        <NavLink href="/signup">Sign Up</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
