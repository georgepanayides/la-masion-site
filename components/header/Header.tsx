'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="absolute top-12 left-0 right-0 z-50 bg-transparent">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <ul className="flex justify-center items-center gap-6 md:gap-8">
          <li>
            <Link 
              href="/" 
              className={`text-xs uppercase tracking-widest text-rice-paper/90 hover:text-clay transition-colors font-light pb-1 ${
                pathname === '/' ? 'border-b border-rice-paper/90' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li className="text-rice-paper/40">/</li>
          <li>
            <Link 
              href="/treatments" 
              className={`text-xs uppercase tracking-widest text-rice-paper/90 hover:text-clay transition-colors font-light pb-1 ${
                pathname.startsWith('/treatments') ? 'border-b border-rice-paper/90' : ''
              }`}
            >
              Treatments
            </Link>
          </li>
          <li className="text-rice-paper/40">/</li>
          <li>
            <Link 
              href="/booking" 
              className={`text-xs uppercase tracking-widest text-rice-paper/90 hover:text-clay transition-colors font-light pb-1 ${
                pathname === '/booking' ? 'border-b border-rice-paper/90' : ''
              }`}
            >
              Book
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
