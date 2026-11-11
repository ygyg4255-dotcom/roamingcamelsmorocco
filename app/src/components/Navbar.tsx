import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail, MessageCircle, Settings } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../data/siteConfig';

interface NavbarProps {
  currentPath?: string;
  onOpenQuote?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(true);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    const handleConfigUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('site-config-updated', handleConfigUpdate);
    return () => window.removeEventListener('site-config-updated', handleConfigUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'MOROCCO TOURS', href: '/morocco-tour-finder/' },
    { label: 'TRAVEL GUIDE', href: '/morocco-travel-guide/' },
  ];

  const quickLinks = [
    { label: 'About', href: '/about/' },
    { label: 'How We Work', href: '/how-we-work/' },
    { label: 'FAQ', href: '/faq/' },
    { label: 'Blog', href: '/morocco-travel-guide/' },
    { label: 'Admin Dashboard', href: '/admin/' },
  ];

  return (
    <>
      <header
        id="masthead"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-palette-dark/95 backdrop-blur-md shadow-md py-3' : 'bg-palette-dark/75 backdrop-blur-sm py-4 md:py-6'
        }`}
        role="banner"
      >
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group" rel="home">
            <img
              src="/images/Full-Logo-White-small.png"
              alt="Roaming Camels Morocco"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href || (link.href === '/' && currentPath === '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm tracking-wider font-light transition-colors hover:text-palette-gold ${
                    isActive ? 'text-palette-gold font-medium border-b border-palette-gold pb-1' : 'text-palette-cream'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Quick Links Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setQuickLinksOpen(true)}
              onMouseLeave={() => setQuickLinksOpen(false)}
            >
              <button
                type="button"
                className="flex items-center space-x-1 text-sm tracking-wider font-light text-palette-cream hover:text-palette-gold transition-colors py-2"
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                aria-expanded={quickLinksOpen}
              >
                <span>QUICK LINKS</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${quickLinksOpen ? 'rotate-180' : ''}`} />
              </button>

              {quickLinksOpen && (
                <div className="absolute top-full right-0 w-52 bg-palette-dark2 text-palette-cream shadow-xl rounded-sm border border-palette-dark py-2 z-50">
                  {quickLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-5 py-2.5 text-sm hover:bg-palette-dark hover:text-palette-gold transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp & Contact Buttons */}
            <div className="flex items-center space-x-2">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hidden xl:flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-sm transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={onOpenQuote ? onOpenQuote : () => {
                  const formEl = document.getElementById('quote-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/#quote-form';
                }}
                className="px-5 py-2.5 bg-palette-sand hover:bg-palette-gold text-palette-dark text-xs tracking-widest font-semibold uppercase rounded-sm transition-all duration-200 shadow-sm hover:shadow"
              >
                Contact Us
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="text-palette-cream hover:text-palette-gold p-2 transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Matches capture states-390/state-1.png) */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Menu Panel */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-palette-dark2 text-palette-cream h-full overflow-y-auto shadow-2xl flex flex-col z-10 border-l border-white/10">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <img
                src="/images/Full-Logo-White-small.png"
                alt="Roaming Camels"
                className="h-9 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-palette-cream hover:text-palette-gold p-2 rounded-full focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-4 px-5 space-y-2">
              <a
                href="/"
                className="block py-3 text-base tracking-wider border-b border-white/5 hover:text-palette-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>

              {/* Morocco Tours Submenu */}
              <div className="border-b border-white/5 py-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-2 text-base tracking-wider hover:text-palette-gold transition-colors"
                  onClick={() => setMobileToursOpen(!mobileToursOpen)}
                >
                  <span className="font-medium">Morocco Tours</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToursOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileToursOpen && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-palette-cream/80">
                    <a
                      href="/morocco-tour-finder/"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tour Finder
                    </a>
                    <a
                      href="/#extended_tours"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Extended Tours
                    </a>
                    <a
                      href="/#desert_tours"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Desert Tours
                    </a>
                    <a
                      href="/#day-trips"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Day Trips
                    </a>
                    <a
                      href="/#quote-form"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Custom Luxury Tours
                    </a>
                  </div>
                )}
              </div>

              {/* Travel Guide */}
              <a
                href="/morocco-travel-guide/"
                className="block py-3 text-base tracking-wider border-b border-white/5 hover:text-palette-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Morocco Travel Guide
              </a>

              {/* Work With Us Submenu */}
              <div className="border-b border-white/5 py-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-2 text-base tracking-wider hover:text-palette-gold transition-colors"
                  onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                >
                  <span className="font-medium">Work With Us</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileWorkOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileWorkOpen && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-palette-cream/80">
                    <a
                      href="/about/"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Story
                    </a>
                    <a
                      href="/how-we-work/"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      How We Work
                    </a>
                    <a
                      href="/faq/"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </a>
                    <a
                      href="/morocco-travel-guide/"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </a>
                    <a
                      href="/admin/"
                      className="block py-1.5 text-palette-sand hover:text-palette-gold font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </a>
                    <a
                      href="/#quote-form"
                      className="block py-1.5 hover:text-palette-gold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Contact at bottom of drawer */}
            <div className="p-5 border-t border-white/10 space-y-3 bg-black/20 text-xs text-palette-cream/80">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-palette-sand">
                {siteConfig.ownerName}
              </div>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="flex items-center space-x-2 hover:text-palette-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-palette-gold flex-shrink-0" />
                <span>{siteConfig.phoneLocal} / {siteConfig.phoneIntl}</span>
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp: {siteConfig.phoneLocal}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center space-x-2 hover:text-palette-gold transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-palette-gold flex-shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                  else {
                    const el = document.getElementById('quote-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.href = '/#quote-form';
                  }
                }}
                className="w-full mt-2 py-3 bg-palette-sand hover:bg-palette-gold text-palette-dark text-center font-bold tracking-widest text-xs uppercase rounded transition-colors"
              >
                Plan Your Morocco Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
