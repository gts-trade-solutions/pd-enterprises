'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black shadow-lg py-4 border-b border-crimson/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className={`transition-colors duration-300 ${isScrolled ? 'text-crimson' : 'text-crimson'}`}>
                PD
              </span>
              <span className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-white'}`}>
                Enterprises
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors duration-300 hover:text-crimson ${
                  isScrolled ? 'text-gray-200' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/avrame"
              className="bg-crimson text-white px-6 py-2 rounded-full hover:bg-crimson-light transition-all duration-300 hover:scale-105 glow-red"
            >
              Engineered A-Frame Living, Built Around You
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-charcoal rounded-lg shadow-lg p-6 border border-crimson/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-200 hover:text-crimson font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/avrame"
              className="block bg-crimson text-white px-6 py-2 rounded-full text-center hover:bg-crimson-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >Engineered A-Frame Living, Built Around You
              
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
