'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();

  // Hide header on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="w-full px-6 py-5 flex items-center justify-between bg-[#050505] z-50">
      {/* Left: Logo NavHub Image */}
      <Link href="/" className="flex items-center cursor-pointer">
        <Image 
          src="/assets/icone-logo-navhub-dourado.png" 
          alt="NavHub" 
          width={120} 
          height={32} 
          className="object-contain"
        />
      </Link>
      
      {/* Right: User Avatar and Hamburger */}
      <div className="flex items-center gap-4">
        <Link href="/perfil" className="w-10 h-10 rounded-full border border-neutral-700 bg-[#1A1A1A] flex items-center justify-center cursor-pointer overflow-hidden">
          <Image 
            src="/assets/icone-perfil.png" 
            alt="Perfil" 
            width={40} 
            height={40} 
            className="w-full h-full object-cover"
          />
        </Link>
        <button className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent border-0 p-0">
          <Image 
            src="/assets/icone-menu.png" 
            alt="Menu" 
            width={24} 
            height={24} 
            className="object-contain"
          />
        </button>
      </div>
    </header>
  );
}
