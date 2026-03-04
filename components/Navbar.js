'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isPdDropdownOpen, setIsPdDropdownOpen] = useState(false);
  const [isB2BDropdownOpen, setIsB2BDropdownOpen] = useState(false);
  const [isB2CDropdownOpen, setIsB2CDropdownOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ✅ close dropdowns when route changes
  useEffect(() => {
    setIsPdDropdownOpen(false);
    setIsB2BDropdownOpen(false);
    setIsB2CDropdownOpen(false);
  }, [pathname]);

  // ✅ close dropdowns when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      const target = e.target;
      if (!target.closest('[data-dd-root="true"]')) {
        setIsPdDropdownOpen(false);
        setIsB2BDropdownOpen(false);
        setIsB2CDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
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

  // ✅ B2B services (as you asked)
  const b2bLinks = [
    {
      name: ' Energy Optimization & Emergency Systems',
      sub: '(Solar systems, battery storage, generators)',
      href: '/b2b/energy-optimization',
    },
    {
      name: ' Energy Efficient Lighting Systems',
      sub: '(HPWINNER lighting systems)',
      href: '/b2b/lighting-systems',
    },
    {
      name: ' Business Efficiency Measures',
      sub: '',
      href: '/b2b/business-efficiency',
    },
  ];

  // ✅ B2C (Avrame)
  const b2cLinks = [{ name: 'Avrame (A-Frame Living)', sub: '', href: '/avrame' }];

  const isB2BSection = pathname.startsWith('/b2b');
  const isB2CSection = pathname.startsWith('/avrame') || pathname.startsWith('/b2c');

  const isPdSection =
    pathname.startsWith('/pd-hub') || pathname.startsWith('/pd-invest');

  // ✅ Strong border style (desktop buttons)
  const desktopDropdownBtnBase =
    'flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border-2 ' +
    'border-crimson shadow-[0_0_0_1px_rgba(220,38,38,0.95),0_0_18px_rgba(220,38,38,0.40)] ' +
    'hover:shadow-[0_0_0_2px_rgba(220,38,38,1),0_0_26px_rgba(220,38,38,0.55)] ' +
    'text-white hover:bg-crimson/15';

  const desktopDropdownBtnActive =
    'bg-crimson text-white border-2 border-crimson shadow-[0_0_0_2px_rgba(220,38,38,1),0_0_26px_rgba(220,38,38,0.55)]';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300
        ${
          isScrolled
            ? 'bg-black/80 backdrop-blur shadow-lg border-b border-crimson/25'
            : 'bg-transparent'
        }
      `}
    >
      <nav className="h-16 md:h-20">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/pd-logo.png"
              alt="PD Enterprises"
              width={58}
              height={54}
              className="rounded-full"
              priority
            />
            <span className="text-white text-xl font-semibold tracking-wide">
              Enterprises
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    font-medium transition-colors
                    ${
                      active
                        ? 'text-crimson border-b-2 border-crimson'
                        : `${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-crimson`
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* ✅ B2B dropdown */}
            <div className="relative" data-dd-root="true">
              <button
                onClick={() => {
                  setIsB2BDropdownOpen((v) => !v);
                  setIsB2CDropdownOpen(false);
                  setIsPdDropdownOpen(false);
                }}
                className={`${desktopDropdownBtnBase} ${
                  isB2BSection ? desktopDropdownBtnActive : ''
                }`}
              >
                <span>B2B</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isB2BDropdownOpen && (
                <div className="absolute right-0 mt-3 w-[360px] rounded-2xl bg-charcoal border border-crimson/25 shadow-2xl py-2 overflow-hidden">
                  {b2bLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm
                        ${
                          pathname.startsWith(item.href)
                            ? 'bg-crimson/35 text-white font-semibold'
                            : 'text-gray-100 hover:bg-crimson/15'
                        }
                      `}
                      onClick={() => setIsB2BDropdownOpen(false)}
                    >
                      <div className="leading-snug">{item.name}</div>
                      {item.sub ? (
                        <div className="text-xs text-gray-300 mt-1">{item.sub}</div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ B2C dropdown (Avrame) */}
            <div className="relative" data-dd-root="true">
              <button
                onClick={() => {
                  setIsB2CDropdownOpen((v) => !v);
                  setIsB2BDropdownOpen(false);
                  setIsPdDropdownOpen(false);
                }}
                className={`${desktopDropdownBtnBase} ${
                  isB2CSection ? desktopDropdownBtnActive : ''
                }`}
              >
                <span>B2C</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isB2CDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-charcoal border border-crimson/25 shadow-2xl py-2 overflow-hidden">
                  {b2cLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm
                        ${
                          pathname.startsWith(item.href)
                            ? 'bg-crimson/35 text-white font-semibold'
                            : 'text-gray-100 hover:bg-crimson/15'
                        }
                      `}
                      onClick={() => setIsB2CDropdownOpen(false)}
                    >
                      <div className="leading-snug">{item.name}</div>
                      {item.sub ? (
                        <div className="text-xs text-gray-300 mt-1">{item.sub}</div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ PD Ecosystem dropdown (desktop) */}
            <div className="relative" data-dd-root="true">
              <button
                onClick={() => {
                  setIsPdDropdownOpen((v) => !v);
                  setIsB2BDropdownOpen(false);
                  setIsB2CDropdownOpen(false);
                }}
                className={`${desktopDropdownBtnBase} ${
                  isPdSection ? desktopDropdownBtnActive : ''
                }`}
              >
                <span>PD Ecosystem</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isPdDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-charcoal border border-crimson/25 shadow-2xl py-2 overflow-hidden">
                  <Link
                    href="/pd-hub"
                    className={`
                      block px-4 py-3 text-sm
                      ${
                        pathname.startsWith('/pd-hub')
                          ? 'bg-crimson/35 text-white font-semibold'
                          : 'text-gray-100 hover:bg-crimson/15'
                      }
                    `}
                    onClick={() => setIsPdDropdownOpen(false)}
                  >
                    PD Hub
                  </Link>

                  <Link
                    href="/pd-invest"
                    className={`
                      block px-4 py-3 text-sm
                      ${
                        pathname.startsWith('/pd-invest')
                          ? 'bg-crimson/35 text-white font-semibold'
                          : 'text-gray-100 hover:bg-crimson/15'
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
              setIsB2BDropdownOpen(false);
              setIsB2CDropdownOpen(false);
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
        <div className="md:hidden bg-charcoal border-t border-crimson/25 px-6 py-4 space-y-4">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`block font-medium ${
                  active ? 'text-crimson' : 'text-gray-200 hover:text-crimson'
                }`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPdDropdownOpen(false);
                  setIsB2BDropdownOpen(false);
                  setIsB2CDropdownOpen(false);
                }}
              >
                {link.name}
              </Link>
            );
          })}

          {/* B2B dropdown (mobile) */}
          <div className="border-t border-crimson/25 pt-4 mt-4" data-dd-root="true">
            <button
              onClick={() => {
                setIsB2BDropdownOpen((v) => !v);
                setIsB2CDropdownOpen(false);
                setIsPdDropdownOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-left transition-all border-2
                ${
                  isB2BSection
                    ? 'border-crimson text-crimson font-semibold bg-white'
                    : 'border-crimson text-gray-900 bg-white'
                }`}
            >
              <span>B2B</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isB2BDropdownOpen && (
              <div className="mt-3 space-y-2">
                {b2bLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm bg-white hover:bg-zinc-100`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsB2BDropdownOpen(false);
                    }}
                  >
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    {item.sub ? (
                      <div className="text-xs text-gray-600 mt-1">{item.sub}</div>
                    ) : null}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* B2C dropdown (mobile) */}
          <div className="border-t border-crimson/25 pt-4 mt-2" data-dd-root="true">
            <button
              onClick={() => {
                setIsB2CDropdownOpen((v) => !v);
                setIsB2BDropdownOpen(false);
                setIsPdDropdownOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-left transition-all border-2
                ${
                  isB2CSection
                    ? 'border-crimson text-crimson font-semibold bg-white'
                    : 'border-crimson text-gray-900 bg-white'
                }`}
            >
              <span>B2C</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isB2CDropdownOpen && (
              <div className="mt-3 space-y-2">
                {b2cLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm bg-white hover:bg-zinc-100`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsB2CDropdownOpen(false);
                    }}
                  >
                    <div className="font-semibold text-gray-900">{item.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* PD Ecosystem dropdown (mobile) */}
          <div className="border-t border-crimson/25 pt-4 mt-2" data-dd-root="true">
            <button
              onClick={() => {
                setIsPdDropdownOpen((v) => !v);
                setIsB2BDropdownOpen(false);
                setIsB2CDropdownOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-left transition-all border-2
                ${
                  isPdSection
                    ? 'border-crimson text-crimson font-semibold bg-white'
                    : 'border-crimson text-gray-900 bg-white'
                }`}
            >
              <span>PD Ecosystem</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isPdDropdownOpen && (
              <div className="mt-3 space-y-2">
                <Link
                  href="/pd-hub"
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm bg-white hover:bg-zinc-100"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPdDropdownOpen(false);
                  }}
                >
                  <div className="font-semibold text-gray-900">PD Hub</div>
                </Link>

                <Link
                  href="/pd-invest"
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm bg-white hover:bg-zinc-100"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPdDropdownOpen(false);
                  }}
                >
                  <div className="font-semibold text-gray-900">PD Invest</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}