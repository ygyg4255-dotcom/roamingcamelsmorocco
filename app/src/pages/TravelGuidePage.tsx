import React, { useState } from 'react';
import { GUIDE_ARTICLES } from '../data/guides';
import { QuoteForm } from '../components/QuoteForm';
import { Compass, Calendar, MapPin, BookOpen, CheckCircle, ArrowRight, Info } from 'lucide-react';

export const TravelGuidePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const categories = [
    { key: 'best-times', label: 'Best Times To Visit' },
    { key: 'getting-around', label: 'Getting To & Around' },
    { key: 'places-to-visit', label: 'Places To Visit' },
    { key: 'things-to-know', label: 'Things To Know' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section
        className="relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center text-center text-white bg-palette-dark bg-cover bg-center pt-28 pb-16 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(36, 20, 15, 0.55), rgba(36, 20, 15, 0.7)), url('/images/Morocco-Travel-Guide-min-683x1024.jpg')`
        }}
      >
        <div className="max-w-3xl mx-auto z-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-palette-sand font-medium">
            Expert Travel Insights
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
            Morocco Travel Guide
          </h1>
          <p className="text-sm sm:text-base text-palette-cream/90 font-light max-w-xl mx-auto">
            Practical knowledge, seasonal packing lists, and local cultural guidance for private travelers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="/morocco-tour-finder/"
              className="px-5 py-2.5 bg-palette-sand hover:bg-palette-gold text-palette-dark text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
            >
              Tour Finder
            </a>
            <a
              href="#about-morocco"
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors backdrop-blur-sm"
            >
              About Morocco
            </a>
            <a
              href="#planning"
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors backdrop-blur-sm"
            >
              Planning Your Trip
            </a>
            <a
              href="#things-to-know"
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors backdrop-blur-sm"
            >
              Things To Know
            </a>
          </div>
        </div>
      </section>

      {/* Intro Overview */}
      <section id="about-morocco" className="py-16 md:py-24 bg-white border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold text-center">
              A Land of Wonder
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark text-center leading-tight">
              What To Expect From A Morocco Travel Experience
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-8" />

            <div className="space-y-4 text-sm sm:text-base text-palette-dark/85 font-light leading-relaxed">
              <p>
                Morocco is a near perfect travel destination and it is certainly a unique one. Many travellers who come to Morocco immediately start planning for their return trip as they are so overwhelmed by the complexity of sight and sound.
              </p>
              <p>
                Geographically and culturally Morocco is a very diverse country. Offering cities, sea coast, mountains and the mighty Sahara, Morocco is filled with options for vacationers and serious travellers alike. From the exotic international port of Tangier in the far north, to the High Atlas Mountains and ancient markets of Marrakech. Morocco offers a beach experience, the chance to summit one of Africa’s highest mountains, or a trip into the Sahara desert. World class golf courses, seaside resorts and an artisanal culture it compares to nowhere else.
              </p>
              <blockquote className="p-4 bg-palette-grayBg border-l-4 border-palette-terracotta italic text-palette-dark font-normal">
                “Few visitors leave Morocco without noting ‘I was very surprised to learn…’”
              </blockquote>
              <p>
                Located on the north western coast of Africa, it is not the Middle East, nor is it Africa. Having been colonized by the French and Spanish from 1912 through 1952, it is not a European country either, but it's hard to tell at times. Morocco is predominantly Muslim but notably tolerant and liberal in culture. A Constitutional monarchy where the King is ever present while 3 of her major cities have female Mayors.
              </p>
              <p>
                The two official languages are Arabic and Amazigh (Berber). However, the local dialect is called Darija, a language of the streets and not found in Google translate. Most of the population switches rapidly between French, Arabic and Darija. It is not uncommon for the average Moroccan to speak 5 or 6 languages before they graduate high school.
              </p>
              <p>
                In short, to travel in Morocco without the benefit of a guide to interpret the language, customs, culture, history and fascinating politics is to miss a large part of the experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Morocco: Beyond the Map */}
      <section id="planning" className="py-16 md:py-24 bg-palette-grayBg border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark text-center">
              Discover Morocco: A Journey Beyond The Map
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-8" />
            <div className="space-y-4 text-sm sm:text-base text-palette-dark/85 font-light leading-relaxed">
              <p>
                It may look small on the map, but Morocco is about the same size as California. While many people choose to visit Marrakech for a long weekend from Europe, or go to Agadir for a cheeky beach getaway, if you want to really experience Morocco it's best to plan about 10 days, give or take a day or so.
              </p>
              <p>
                When you travel to Morocco you can set your budget from moderate to high end luxury. It is not inexpensive like Southeast Asia; rather, prices are more inline with modest European destinations. But it is still very affordable, while at the same time offering some absolutely stunning luxury hotels and riads that have caught the attention of global vacationing celebrities.
              </p>
              <p>
                Plan on a well-paced, but active vacation. Your days will be busy with sightseeing, and travelling between destinations. There is scenic driving to be done in Morocco, but fortunately we take care of all that driving for you in comfortable air-conditioned private vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Article Sections */}
      {/* 1. Best Times To Visit */}
      <section className="py-16 md:py-20 bg-white border-b border-palette-cream">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark mb-3">
              Best Times To Visit
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-palette-dark/70 font-light">
              Seasonal guides, climate tips, and packing lists to prepare for your departure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDE_ARTICLES['best-times'].map((art) => (
              <div
                key={art.id}
                className="bg-palette-grayBg p-6 rounded border border-gray-200 shadow-sm flex flex-col justify-between hover:border-palette-navy transition-colors"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-palette-terracotta">
                    {art.category}
                  </span>
                  <h3 className="text-base font-serif font-bold text-palette-dark mt-2 mb-3 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-palette-dark/75 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200/60">
                  <a
                    href="#quote-form"
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-palette-navy hover:text-palette-terracotta transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Getting To & Around Morocco */}
      <section className="py-16 md:py-20 bg-palette-grayBg border-b border-palette-cream">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark mb-3">
              Getting To &amp; Around Morocco
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-palette-dark/70 font-light">
              Flight hubs, city taxis, and the benefits of guided private touring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDE_ARTICLES['getting-around'].map((art) => (
              <div
                key={art.id}
                className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col justify-between hover:border-palette-navy transition-colors"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-palette-terracotta">
                    ROAMING CAMELS
                  </span>
                  <h3 className="text-base font-serif font-bold text-palette-dark mt-2 mb-3 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-palette-dark/75 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <a
                    href="#quote-form"
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-palette-navy hover:text-palette-terracotta transition-colors"
                  >
                    <span>Read More »</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Places To Visit */}
      <section className="py-16 md:py-20 bg-white border-b border-palette-cream">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark mb-3">
              Places To Visit
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-palette-dark/70 font-light">
              Explore destinations across the high peaks, ancient medinas, and vast sand dunes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDE_ARTICLES['places-to-visit'].map((art) => (
              <div
                key={art.id}
                className="bg-palette-grayBg p-6 rounded border border-gray-200 shadow-sm flex flex-col justify-between hover:border-palette-navy transition-colors"
              >
                <div>
                  <h3 className="text-sm font-serif font-bold text-palette-dark mb-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-palette-dark/75 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200/60">
                  <a
                    href="#quote-form"
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-palette-navy hover:text-palette-terracotta transition-colors"
                  >
                    <span>Read More »</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Things To Know */}
      <section id="things-to-know" className="py-16 md:py-20 bg-palette-grayBg border-b border-palette-cream">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark mb-3">
              Things To Know
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-palette-dark/70 font-light">
              Local traditions, food customs, tipping standards, and accommodation styles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDE_ARTICLES['things-to-know'].map((art) => (
              <div
                key={art.id}
                className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col justify-between hover:border-palette-navy transition-colors"
              >
                <div>
                  <h3 className="text-sm font-serif font-bold text-palette-dark mb-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-palette-dark/75 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <a
                    href="#quote-form"
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-palette-navy hover:text-palette-terracotta transition-colors"
                  >
                    <span>Read More →</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Your Journey Banner */}
      <section className="py-16 bg-palette-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-palette-sand font-medium">
            Morocco Awaits
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white">
            Create Your Journey
          </h2>
          <p className="text-sm text-palette-cream/80 max-w-xl mx-auto font-light leading-relaxed">
            We create Morocco tour packages specifically for you. We are an independent Morocco travel agency offering the best Morocco private tours with a wealth of experience in creating Morocco desert tours and providing personal, attentive service from start to finish.
          </p>
          <div className="pt-4">
            <a
              href="/morocco-tour-finder/"
              className="inline-block px-7 py-3.5 bg-palette-sand hover:bg-palette-gold text-palette-dark text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow"
            >
              Morocco Tour Finder
            </a>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm id="quote-form" />
    </div>
  );
};
