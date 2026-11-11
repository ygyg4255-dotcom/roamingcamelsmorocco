import React, { useState, useEffect } from 'react';
import { REVIEWS_DATA } from '../data/reviews';
import { QuoteForm } from '../components/QuoteForm';
import { Quote, Star, Compass, Award, Heart, CheckCircle2, Phone, Mail, MessageCircle, Instagram, MapPin } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../data/siteConfig';

export const AboutPage: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('site-config-updated', handleUpdate);
    return () => window.removeEventListener('site-config-updated', handleUpdate);
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section
        className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center text-center text-white bg-palette-dark bg-cover bg-center pt-28 pb-14 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(36, 20, 15, 0.55), rgba(36, 20, 15, 0.7)), url('/images/Morocco-Tour-Finder-Roaming-Camels-Morocco-1.jpg')`
        }}
      >
        <div className="max-w-3xl mx-auto z-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-palette-sand font-medium">
            Who We Are
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
            Our Story
          </h1>
          <p className="text-sm sm:text-base text-palette-cream/90 font-light max-w-xl mx-auto">
            Native Amazigh heritage combined with international luxury hospitality standards.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-white border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold">
              Our Core Philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark leading-tight">
              As A Tour Agency In Morocco Our Philosophy Is Simple
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto" />
            <h3 className="text-xl sm:text-2xl font-serif text-palette-navy italic">
              Your safety and enjoyment are our first priorities
            </h3>
            <div className="space-y-4 text-base text-palette-dark/85 font-light leading-relaxed text-left">
              <p>
                We hire guides and drivers that are professional, knowledgeable, and focused on customer service. We provide the service. Morocco, this place, provides the magic. We use our extensive tourism skills to create the best trips for your tour group.
              </p>
              <p>
                When you enjoy a custom Morocco tour with Roaming Camels Morocco we will create a trip plan to suit your needs and interests. Some of our guests enjoy a relaxed pace with some active hiking and exploring mixed in. Some of our guests want to focus on the Moroccan food available around the country, or learn more about the Amazigh culture. Some want to meet artisans and see amazing interior design inspiration.
              </p>
              <p className="font-normal text-palette-dark">
                We are here to listen to your needs and make this happen for you.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="/morocco-tour-finder/"
                className="inline-block px-7 py-3.5 bg-palette-navy hover:bg-palette-dark text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow"
              >
                Tour Finder
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What The Travelers Say (Testimonials) */}
      <section className="py-16 md:py-24 bg-palette-grayBg border-b border-palette-cream">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold mb-2">
              Guest Experiences
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark">
              WHAT THE TRAVELERS SAY
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 rounded border border-gray-200 shadow-sm flex flex-col justify-between relative"
              >
                <Quote className="w-10 h-10 text-palette-sand/40 absolute top-6 right-6 pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex text-amber-500 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-palette-dark leading-snug">
                    {rev.title}
                  </h3>
                  <p className="text-xs text-palette-dark/80 leading-relaxed font-light italic">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-palette-terracotta">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-palette-dark/60 font-light">
                    {rev.tour}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders / Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Mohammed El Kouih Profile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <div className="relative rounded overflow-hidden shadow-lg border border-gray-100 aspect-[4/5] bg-palette-dark/5 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-28 h-28 rounded-full bg-palette-navy text-palette-sand flex items-center justify-center text-3xl font-serif font-bold mb-4 shadow-md">
                  ME
                </div>
                <h3 className="font-serif text-2xl font-bold text-palette-dark">{siteConfig.ownerName}</h3>
                <p className="text-xs uppercase tracking-widest text-palette-terracotta font-semibold mt-1">
                  Owner &amp; Lead Expedition Director
                </p>
                <div className="w-12 h-0.5 bg-palette-terracotta my-3" />
                <p className="text-xs text-palette-dark/70 font-light flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-palette-terracotta" />
                  <span>{siteConfig.location}</span>
                </p>

                {/* Direct quick action badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium inline-flex items-center space-x-1 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="px-3 py-1.5 bg-palette-navy hover:bg-palette-dark text-white rounded text-xs font-medium inline-flex items-center space-x-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{siteConfig.phoneLocal}</span>
                  </a>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-pink-700 hover:bg-pink-600 text-white rounded text-xs font-medium inline-flex items-center space-x-1 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold">
                OWNER &amp; FOUNDER
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark">
                Meet {siteConfig.ownerName}
              </h2>
              <div className="w-12 h-0.5 bg-palette-terracotta" />
              <div className="space-y-3 text-sm text-palette-dark/85 font-light leading-relaxed">
                <p>
                  {siteConfig.ownerName} is the driving visionary and owner behind Roaming Camels Morocco. Rooted deeply in Moroccan hospitality and authentic cultural traditions, he is committed to providing travelers from around the globe with safe, enriching, and unforgettable private tours across Morocco.
                </p>
                <p>
                  With extensive on-the-ground experience traversing the High Atlas mountain passes, the imperial heritage medinas of Fes and Marrakech, and the grand golden dunes of the Sahara Desert, {siteConfig.ownerName} curates every tour itinerary with bespoke care, transparent pricing, and personal attention.
                </p>
                <p>
                  Whether you are planning a romantic luxury honeymoon, an adventurous family trek, or a private cultural excursion, {siteConfig.ownerName} works with you directly from your first message until you return safely home.
                </p>
              </div>

              {/* Direct Contact Card */}
              <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-palette-grayBg rounded border border-gray-200">
                  <span className="font-semibold text-palette-dark block mb-1">Direct Phone / WhatsApp:</span>
                  <a href={`tel:${siteConfig.phoneTel}`} className="text-palette-terracotta hover:underline block font-medium">
                    {siteConfig.phoneLocal} ({siteConfig.phoneIntl})
                  </a>
                </div>
                <div className="p-3 bg-palette-grayBg rounded border border-gray-200">
                  <span className="font-semibold text-palette-dark block mb-1">Direct Email:</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-palette-navy hover:underline block font-medium break-all">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm id="quote-form" />
    </div>
  );
};
