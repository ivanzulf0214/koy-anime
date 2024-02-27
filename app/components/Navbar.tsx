"use client"

import Link from 'next/link';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBars, FaStar, FaX } from 'react-icons/fa6';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href={`/`} className="text-white font-bold text-2xl">KoyAnime</Link>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="bg-gray-700 px-3 py-2 rounded-md ">
                            {isOpen ? (
                                <FaX className='text-white' />
                            ) : (
                                <FaBars className='text-white' />
                            )}
                        </button>
                    </div>
                    <ul className='hidden md:flex space-x-10 text-white'>
                        <li>
                            <Link href={`/`} className='hover:text-slate-300'>Top Anime</Link>
                        </li>
                        <li>
                            <Link href={`#`} className='hover:text-slate-300'>Browse</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden fixed p-5 top-[64px] right-0 h-full w-full bg-gray-800 z-50`}>
                <ul className="flex flex-col pt-4 gap-8">
                    <li className='text-white flex items-center gap-4'>
                        <FaStar />
                        <Link href={`/`}>Top Anime</Link>
                    </li>
                    <li className='text-white flex items-center gap-4'>
                        <FaSearch />
                        <Link href={`#`}>Browse</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
