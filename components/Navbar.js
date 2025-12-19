'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPdDropdownOpen, setIsPdDropdownOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/post' },

  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isAvrame = pathname.startsWith('/avrame');
  const isPdSection =
    pathname.startsWith('/pd-hub') || pathname.startsWith('/pd-invest');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300
        ${isScrolled
          ? 'bg-black/80 backdrop-blur shadow-lg border-b border-crimson/20'
          : 'bg-transparent'
        }
      `}
    >
      {/* Give the bar a fixed height */}
      <nav className="h-16 md:h-20">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-crimson">PD</span>
              <span className="text-white">Enterprise</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    font-medium transition-colors
                    ${active
                      ? 'text-crimson border-b-2 border-crimson'
                      : `${isScrolled ? 'text-gray-200' : 'text-white'
                      } hover:text-crimson`
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Avrame CTA (desktop) */}
            <Link
              href="/avrame"
              className={`
                px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 glow-red
                ${isAvrame
                  ? 'bg-white text-crimson border border-crimson'
                  : 'bg-crimson text-white hover:bg-crimson-light'
                }
              `}
            >
              Engineered A-Frame Living, Built Around You
            </Link>

            {/* PD Hub + PD Invest dropdown (desktop) */}
            <div className="relative">
              <button
                onClick={() => setIsPdDropdownOpen((v) => !v)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border
                  ${isPdSection
                    ? 'bg-crimson text-white border-crimson hover:bg-crimson-light'
                    : 'border-crimson/40 text-white hover:bg-crimson/20'
                  }
                `}
              >
                <span>PD Ecosystem</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isPdDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-charcoal border border-crimson/20 shadow-lg py-2">
                  <Link
                    href="/pd-hub"
                    className={`
                      block px-4 py-2 text-sm
                      ${pathname.startsWith('/pd-hub')
                        ? 'bg-crimson/40 text-white font-semibold'
                        : 'text-gray-100 hover:bg-crimson/20'
                      }
                    `}
                    onClick={() => setIsPdDropdownOpen(false)}
                  >
                    PD Hub
                  </Link>
                  <Link
                    href="/pd-invest"
                    className={`
                      block px-4 py-2 text-sm
                      ${pathname.startsWith('/pd-invest')
                        ? 'bg-crimson/40 text-white font-semibold'
                        : 'text-gray-100 hover:bg-crimson/20'
                      }
                    `}
                    onClick={() => setIsPdDropdownOpen(false)}
                  >
                    PD Invest
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => {
              setIsMobileMenuOpen((v) => !v);
              setIsPdDropdownOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal border-t border-crimson/20 px-6 py-4 space-y-4">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  block font-medium
                  ${active
                    ? 'text-crimson'
                    : 'text-gray-200 hover:text-crimson'
                  }
                `}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPdDropdownOpen(false);
                }}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Avrame CTA (mobile) */}
          <Link
            href="/avrame"
            className={`
              block mt-2 px-6 py-2 rounded-full text-center transition-all
              ${isAvrame
                ? 'bg-white text-crimson border border-crimson'
                : 'bg-crimson text-white hover:bg-crimson-light'
              }
            `}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsPdDropdownOpen(false);
            }}
          >
            Engineered A-Frame Living, Built Around You
          </Link>

          {/* PD Hub + PD Invest dropdown (mobile) */}
          <div className="border-t border-crimson/20 pt-4 mt-4">
            <button
              onClick={() => setIsPdDropdownOpen((v) => !v)}
              className={`
      w-full flex items-center justify-between px-4 py-2 rounded-lg text-left transition-all border bg-white
      ${isPdSection
                  ? 'border-crimson text-crimson font-semibold'
                  : 'border-crimson/40 text-gray-900 hover:bg-zinc-100'
                }
    `}
            >
              <span>PD Hub</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isPdDropdownOpen && (
              <div className="mt-3 space-y-2">
                <Link
                  href="/pd-hub"
                  className={`
          block w-full text-left px-4 py-2 rounded-lg text-sm
          ${pathname.startsWith('/pd-hub')
                      ? 'bg-crimson/10 text-crimson font-semibold'
                      : 'bg-white text-gray-900 hover:bg-zinc-100'
                    }
        `}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPdDropdownOpen(false);
                  }}
                >
                  PD Hub
                </Link>
                <Link
                  href="/pd-invest"
                  className={`
          block w-full text-left px-4 py-2 rounded-lg text-sm
          ${pathname.startsWith('/pd-invest')
                      ? 'bg-crimson/10 text-crimson font-semibold'
                      : 'bg-white text-gray-900 hover:bg-zinc-100'
                    }
        `}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPdDropdownOpen(false);
                  }}
                >
                  PD Invest
                </Link>
              </div>
            )}
          </div>


        </div>
      )}
    </header>
  );
}
