import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, MapPin, CheckCircle, Instagram } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../data/siteConfig';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    const handleConfigUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('site-config-updated', handleConfigUpdate);
    return () => window.removeEventListener('site-config-updated', handleConfigUpdate);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterName('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-palette-navy text-palette-cream" role="contentinfo">
      {/* Newsletter Section */}
      <div className="bg-[#2B3550] border-b border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1140px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-palette-sand mb-2 font-medium">
            Stay In The Know
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-6">
            Join Our Newsletter For All The Latest On Morocco Travel
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-palette-cream/80 mb-8 font-light">
            Receive insider travel tips, curated desert itineraries, cultural stories, and seasonal travel advice straight from our local experts.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center space-x-2 bg-palette-green/40 border border-palette-green text-white px-6 py-3 rounded text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Thank you for joining our Morocco travel community! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-palette-cream/60 focus:outline-none focus:border-palette-sand"
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-palette-cream/60 focus:outline-none focus:border-palette-sand"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-palette-sand hover:bg-palette-gold text-palette-dark text-xs tracking-widest font-semibold uppercase rounded-sm transition-colors whitespace-nowrap shadow"
              >
                Join The List
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-[1290px] mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h6 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium">
              Let's Connect
            </h6>
            <a href="/" className="inline-block">
              <img
                src="/images/Full-Logo-White-small.png"
                alt="Roaming Camels Morocco"
                className="h-12 w-auto mb-3"
              />
            </a>
            <p className="text-xs text-palette-cream/80 leading-relaxed font-light">
              ROAMING CAMELS MOROCCO IS OWNED AND OPERATED BY {siteConfig.ownerName.toUpperCase()}, A HIGHLY RESPECTED NATIVE GUIDE WITH YEARS OF EXPERIENCE LEADING TOURS OF ALL KINDS. TRUST US TO SHOW YOU THE BEST FOR PRIVATE TOURS IN MOROCCO.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-palette-cream/80">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-palette-sand hover:text-palette-dark transition-colors"
                aria-label={`Instagram: ${siteConfig.instagramUsername}`}
                title={`Instagram: ${siteConfig.instagramUsername}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors text-emerald-400"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 rounded-full bg-white/10 hover:bg-palette-sand hover:text-palette-dark transition-colors"
                aria-label="Email"
                title={`Email: ${siteConfig.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="p-2 rounded-full bg-white/10 hover:bg-palette-sand hover:text-palette-dark transition-colors"
                aria-label="Call"
                title={`Call: ${siteConfig.phoneLocal}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="/morocco-tour-finder/" className="hover:text-palette-gold transition-colors">
                  MOROCCO TOUR PACKAGES
                </a>
              </li>
              <li>
                <a href="/morocco-travel-guide/" className="hover:text-palette-gold transition-colors">
                  MOROCCO TRAVEL GUIDE
                </a>
              </li>
              <li>
                <a href="/about/" className="hover:text-palette-gold transition-colors">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="/how-we-work/" className="hover:text-palette-gold transition-colors">
                  HOW WE WORK
                </a>
              </li>
              <li>
                <a href="/faq/" className="hover:text-palette-gold transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/morocco-travel-guide/" className="hover:text-palette-gold transition-colors">
                  ROAMING CAMELS BLOG
                </a>
              </li>
              <li>
                <a href="/#quote-form" className="hover:text-palette-gold transition-colors">
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div>
              <h6 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium mb-1">
                Owner &amp; Lead Guide
              </h6>
              <p className="text-xs text-white font-serif font-bold">
                {siteConfig.ownerName}
              </p>
              <p className="text-[11px] text-palette-cream/70 font-light">
                Direct Contact &amp; Custom Trip Planning
              </p>
            </div>

            <div>
              <h6 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium mb-1">
                Phone
              </h6>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-xs text-palette-cream/90 hover:text-palette-gold transition-colors flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-palette-sand flex-shrink-0" />
                <span>Local: {siteConfig.phoneLocal}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-xs text-palette-cream/70 hover:text-palette-gold transition-colors flex items-center space-x-2 mt-1"
              >
                <span className="w-3.5 text-center text-palette-sand">✦</span>
                <span>Intl: {siteConfig.phoneIntl}</span>
              </a>
            </div>

            <div>
              <h6 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium mb-1">
                Email
              </h6>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xs text-palette-cream/90 hover:text-palette-gold transition-colors flex items-center space-x-2 break-all"
              >
                <Mail className="w-3.5 h-3.5 text-palette-sand flex-shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
            </div>

            <div>
              <h6 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium mb-1">
                WhatsApp Direct
              </h6>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-palette-cream/90 hover:text-emerald-300 transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{siteConfig.phoneIntl}</span>
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div className="space-y-3">
            <h6 className="text-xs uppercase tracking-[0.2em] text-palette-sand font-medium">
              Location &amp; Office
            </h6>
            <div className="text-xs text-palette-cream/80 leading-relaxed font-light space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-palette-sand flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{siteConfig.addressTitle || 'Roaming Camels Morocco Tours'}</p>
                  <p>{siteConfig.addressFull || 'Marrakech, Morocco'}</p>
                  <p className="mt-1 text-[11px] text-palette-cream/60">
                    Location: {siteConfig.location}
                  </p>
                  <p className="text-[11px] text-palette-cream/60">
                    {siteConfig.officeHours || 'Monday – Sunday: 8:00 AM – 8:00 PM'}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-palette-sand hover:text-palette-gold"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram: {siteConfig.instagramUsername}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-palette-cream/60 font-light">
        <div className="max-w-[1290px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2016-2026 ROAMING CAMELS MOROCCO. ALL RIGHTS RESERVED. OPERATED BY {siteConfig.ownerName.toUpperCase()}.</p>
          <div className="flex items-center space-x-4">
            <span className="tracking-widest uppercase">MOROCCO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
