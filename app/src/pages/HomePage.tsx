import React, { useState, useEffect, useMemo } from 'react';
import { getToursData } from '../data/tours';
import { TourCard } from '../components/TourCard';
import { TourFinderFilter } from '../components/TourFinderFilter';
import { QuoteForm } from '../components/QuoteForm';
import { Compass, ShieldCheck, HeartHandshake, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { Tour } from '../types';

export const HomePage: React.FC = () => {
  const [toursList, setToursList] = useState<Tour[]>(() => getToursData());

  useEffect(() => {
    const handleUpdate = () => {
      setToursList(getToursData());
    };
    window.addEventListener('tours-data-updated', handleUpdate);
    return () => window.removeEventListener('tours-data-updated', handleUpdate);
  }, []);

  const activeTours = useMemo(() => toursList.filter((t) => !t.isCancelled), [toursList]);

  const [filters, setFilters] = useState({
    search: '',
    departureCities: [] as string[],
    destinations: [] as string[],
    lengths: [] as string[],
    types: [] as string[]
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered tours for the "Find Your Tour" section
  const filteredTours = useMemo(() => {
    return activeTours.filter((tour) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchTitle = tour.title.toLowerCase().includes(query);
        const matchDesc = tour.description.toLowerCase().includes(query);
        const matchDest = tour.destinations.some((d) => d.toLowerCase().includes(query));
        if (!matchTitle && !matchDesc && !matchDest) return false;
      }

      // Departure city
      if (filters.departureCities.length > 0) {
        if (!filters.departureCities.includes(tour.departureCity)) return false;
      }

      // Destinations
      if (filters.destinations.length > 0) {
        const hasDest = filters.destinations.some((d) => tour.destinations.includes(d));
        if (!hasDest) return false;
      }

      // Tour Type
      if (filters.types.length > 0) {
        if (!filters.types.includes(tour.tourType)) return false;
      }

      // Tour Length
      if (filters.lengths.length > 0) {
        const matchLen = filters.lengths.some((lenKey) => {
          if (lenKey === '1') return tour.durationDays === 1;
          if (lenKey === 'short') return tour.durationDays >= 3 && tour.durationDays <= 4;
          if (lenKey === 'medium') return tour.durationDays >= 7 && tour.durationDays <= 8;
          if (lenKey === 'long') return tour.durationDays >= 10 && tour.durationDays <= 12;
          if (lenKey === 'grand') return tour.durationDays >= 14;
          return false;
        });
        if (!matchLen) return false;
      }

      return true;
    });
  }, [filters, activeTours]);

  const desertTours = useMemo(() => activeTours.filter((t) => t.tourType === 'desert'), [activeTours]);
  const extendedTours = useMemo(() => activeTours.filter((t) => t.tourType === 'extended'), [activeTours]);
  const dayTrips = useMemo(() => activeTours.filter((t) => t.tourType === 'day-trip'), [activeTours]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      departureCities: [],
      destinations: [],
      lengths: [],
      types: []
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[580px] md:min-h-[700px] lg:min-h-[850px] flex items-center justify-center text-center text-white bg-palette-dark bg-cover bg-center pt-28 pb-16 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(36, 20, 15, 0.45), rgba(36, 20, 15, 0.65)), url('/images/Morocco-Tour-Finder-Roaming-Camels-Morocco-1.jpg')`
        }}
      >
        <div className="max-w-4xl mx-auto z-10 space-y-8">
          <p className="text-xs uppercase tracking-[0.3em] text-palette-sand font-medium">
            Authentic Private Moroccan Travel
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white font-normal leading-tight drop-shadow-md">
            Morocco Tour Packages
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-palette-cream font-light max-w-2xl mx-auto leading-relaxed">
            Handcrafted private desert tours, imperial city discoveries, and high Atlas adventures curated by native Amazigh guides.
          </p>

          {/* Quick jump buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <a
              href="#extended_tours"
              className="px-6 py-3 bg-palette-navy hover:bg-[#344062] text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Extended Tours
            </a>
            <a
              href="#desert_tours"
              className="px-6 py-3 bg-palette-terracotta hover:bg-[#833330] text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Desert Tours
            </a>
            <a
              href="#quote-form"
              className="px-6 py-3 bg-palette-sand hover:bg-palette-gold text-palette-dark text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Custom Tours
            </a>
          </div>
        </div>
      </section>

      {/* How We Work Intro Section */}
      <section className="py-16 md:py-24 bg-white border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold">
                  How We Work
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark leading-tight">
                  YOUR TRIP, YOUR WAY
                </h2>
              </div>
              <p className="text-base text-palette-dark/85 leading-relaxed font-light">
                We offer Morocco tours for your small group. Our goal is to offer a superior, authentic experience that meets your private tour needs. Whether you are two people looking for a day trip or a family of 10 looking for a longer trip, we are happy to design the experience you dream of.
              </p>
              <p className="text-base text-palette-dark/85 leading-relaxed font-light">
                The tours and trips you see on our site are popular Morocco private tours with many of our past guests. They are all customizable. Often, once flights are booked and arrival / departure times are known, we adjust the agenda on the first or last day to meet your needs.
              </p>
              <div className="pt-2">
                <a
                  href="#find-tours"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-palette-navy hover:bg-palette-dark text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow"
                >
                  <span>Start Your Adventure</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-5 bg-palette-grayBg rounded border border-palette-cream/80 flex items-start space-x-4">
                <Compass className="w-8 h-8 text-palette-navy flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-base text-palette-dark">100% Tailored Private Tours</h4>
                  <p className="text-xs text-palette-dark/75 mt-1 font-light">No fixed bus schedules. Travel at your own comfortable pace with your dedicated driver.</p>
                </div>
              </div>
              <div className="p-5 bg-palette-grayBg rounded border border-palette-cream/80 flex items-start space-x-4">
                <ShieldCheck className="w-8 h-8 text-palette-terracotta flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-base text-palette-dark">Native Amazigh Leadership</h4>
                  <p className="text-xs text-palette-dark/75 mt-1 font-light">Born and raised in the High Atlas &amp; Sahara, providing rare cultural depth and warmth.</p>
                </div>
              </div>
              <div className="p-5 bg-palette-grayBg rounded border border-palette-cream/80 flex items-start space-x-4">
                <HeartHandshake className="w-8 h-8 text-palette-green flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-base text-palette-dark">Complete Transparency</h4>
                  <p className="text-xs text-palette-dark/75 mt-1 font-light">No hidden fees, no high-pressure shopping stops. Pure Moroccan hospitality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Tour Finder Section */}
      <section id="find-tours" className="py-16 md:py-24 bg-palette-grayBg">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold mb-2">
              Browse Our Catalog
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark mb-4">
              Find Your Tour
            </h2>
            <p className="text-sm text-palette-dark/75 font-light">
              Filter by duration, destination cities, or departure hub to discover the ideal private tour.
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium text-palette-dark flex items-center justify-center space-x-2"
            >
              <Filter className="w-4 h-4 text-palette-navy" />
              <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Tours & Search'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Filter Sidebar */}
            <div className={`lg:col-span-4 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                <TourFinderFilter
                  filters={filters}
                  onChange={setFilters}
                  onReset={handleResetFilters}
                  totalResults={filteredTours.length}
                />
              </div>
            </div>

            {/* Right Tour Grid */}
            <div className="lg:col-span-8">
              {filteredTours.length === 0 ? (
                <div className="bg-white p-12 text-center rounded border border-gray-200">
                  <p className="text-lg font-serif text-palette-dark mb-2">No tours matched your criteria</p>
                  <p className="text-xs text-palette-dark/70 mb-6 font-light">Try clearing some of your search filters or browse all itineraries below.</p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-palette-navy text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-palette-dark transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Desert Trips Section (Terracotta Header #99403d) */}
      <section id="desert_tours" className="scroll-mt-20">
        <div className="bg-palette-terracotta text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-[1140px] mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-sand font-medium mb-1">
              Golden Sahara Dunes &amp; Stargazing
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              Desert Trips
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-palette-cream/90 mt-2 font-light">
              Experience camel trekking over Erg Chebbi dunes, luxury tented desert camps, and unforgettable High Atlas mountain vistas.
            </p>
          </div>
        </div>
        <div className="py-14 bg-white">
          <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {desertTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extended Tours Section (Navy Header #404d72) */}
      <section id="extended_tours" className="scroll-mt-20">
        <div className="bg-palette-navy text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-[1140px] mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-sand font-medium mb-1">
              Immersive Multi-Week Itineraries
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              Extended Tours
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-palette-cream/90 mt-2 font-light">
              Comprehensive private tours connecting Casablanca, Chefchaouen, Fes, the Sahara Desert, the Atlas Mountains, and Marrakech.
            </p>
          </div>
        </div>
        <div className="py-14 bg-palette-grayBg">
          <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {extendedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Day Trips Section (Forest Green Header #2f5a47) */}
      <section id="day-trips" className="scroll-mt-20">
        <div className="bg-palette-green text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-[1140px] mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-sand font-medium mb-1">
              Single-Day Escapes From Marrakech
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              Day Trips
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-palette-cream/90 mt-2 font-light">
              Escape the bustle of the medina for waterfalls in Ouzoud, alpine trails in Imlil, coastal breezes in Essaouira, or sunset in the Agafay desert.
            </p>
          </div>
        </div>
        <div className="py-14 bg-white">
          <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayTrips.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <QuoteForm id="quote-form" />
    </div>
  );
};
