"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          <Link href="/">Weather APP</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-black font-semibold text-lg hover:border hover:border-black rounded p-2 hover:bg-green-300">Home</Link>
          <Link href="/about" className="text-black font-semibold text-lg hover:border hover:border-black rounded p-2 hover:bg-green-300">About</Link>
          <Link href="/contact" className="text-black font-semibold text-lg hover:border hover:border-black rounded p-2 hover:bg-green-300">Contact</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mx-4">
          <Link href="/" className="block px-4 py-2 font-semibold text-black">Home</Link>
          <Link href="/about" className="block px-4  font-semibold py-2 text-black">About</Link>
          <Link href="/contact" className="block px-4  font-semibold py-2 text-black">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
