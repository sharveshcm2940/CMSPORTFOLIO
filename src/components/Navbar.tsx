import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled
          ? 'bg-[#F7F6F2]/92 backdrop-blur-md border-b border-[#DEDDD7]'
          : 'bg-[#F7F6F2] border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4 sm:px-10 lg:px-12">
        {/* Left: Brand Wordmark */}
        <a
          href="#top"
          className="text-[15px] font-medium tracking-[-0.02em] text-[#171717] transition-opacity duration-200 hover:opacity-70 whitespace-nowrap shrink-0"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Right: Navigation Links + Dark CTA Button (matching reference layout) */}
        <div className="flex items-center gap-8 lg:gap-11 shrink-0">
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative py-1 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#171717] font-medium'
                      : 'text-[#171717]/80 hover:text-[#171717]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#171717] transition-transform duration-300 origin-left w-full ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Hello%20Sharvesh`}
            className="group hidden sm:inline-flex items-center justify-between gap-6 rounded-[6px] bg-[#171717] px-5 py-2.5 text-[13.5px] font-medium text-[#F7F6F2] transition-colors duration-200 hover:bg-[#52634F] whitespace-nowrap shrink-0"
          >
            <span>Talk to me</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 text-[#F7F6F2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center text-[#171717] hover:text-[#52634F] transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#DEDDD7] bg-[#F7F6F2] px-6 py-6 sm:px-10">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-[16px] py-1 transition-colors ${
                    isActive ? 'text-[#171717] font-medium' : 'text-[#737373]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-[#DEDDD7]">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Hello%20Sharvesh`}
                onClick={handleNavClick}
                className="inline-flex w-full items-center justify-between rounded-[6px] bg-[#171717] px-5 py-3 text-[14px] font-medium text-[#F7F6F2]"
              >
                <span>Talk to me</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
