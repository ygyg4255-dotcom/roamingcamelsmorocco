import React from 'react';
import { QuoteForm } from '../components/QuoteForm';
import {
  Plane,
  UserCheck,
  Building,
  Utensils,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const HowWeWorkPage: React.FC = () => {
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
            Our Process &amp; Standards
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
            How We Work
          </h1>
          <p className="text-sm sm:text-base text-palette-cream/90 font-light max-w-xl mx-auto">
            Transparent pricing, effortless booking, and personalized private touring from start to finish.
          </p>
        </div>
      </section>

      {/* Core Pillar Intro */}
      <section className="py-16 md:py-24 bg-white border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold">
              Seamless Planning
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark leading-tight">
              Being Easy To Work With Is One Of Our Core Pillars
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto" />
            <div className="space-y-4 text-base text-palette-dark/85 font-light leading-relaxed text-left">
              <p>
                In today’s travel world there is so much to consider that it can quickly become overwhelming. With all our experience and skill in planning Morocco travel, you should not have to work hard to get the trip you are looking for.
              </p>
              <p>
                We know Morocco and we are very experienced in travelling around the country. With years of on the ground experience and a keen ear to guest feedback, you can confidently leave the details to us.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="#first-steps"
                className="inline-block px-7 py-3.5 bg-palette-navy hover:bg-palette-dark text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow"
              >
                Ready To Book?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* First Steps Section */}
      <section id="first-steps" className="py-16 md:py-24 bg-palette-grayBg border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold text-center mb-2">
              The Planning Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark text-center mb-6">
              First Steps
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-10" />

            <div className="space-y-4 text-sm sm:text-base text-palette-dark/85 font-light leading-relaxed mb-8">
              <p>
                When you are coming to Morocco there are a few basic details that we need to settle right from the start. We need to plan the most efficient route for you, as well as making sure that you have time to enjoy the sights, while making good progress.
              </p>
              <p>
                We want to learn about your travel style, whether you are coming to Morocco for a custom luxury tour, or you are hoping for a more budget friendly experience. And we want to know where you are coming from and going to.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded border border-gray-200 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-lg text-palette-dark border-b border-gray-100 pb-3">
                The Details We Gather To Build Your Itinerary:
              </h3>
              <ul className="space-y-3 text-sm text-palette-dark/80 font-light">
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-palette-sand/40 text-palette-dark font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>How many days and nights you will be visiting us</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-palette-sand/40 text-palette-dark font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>What airport you will arrive to and depart from (and approximate times if you know from the start)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-palette-sand/40 text-palette-dark font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>How many people in your group and how old the children are (if traveling as a family)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-palette-sand/40 text-palette-dark font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span>How many rooms you will need</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-palette-sand/40 text-palette-dark font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    5
                  </span>
                  <span>
                    What sort of hotels you are interested in:
                    <span className="block mt-2 pl-2 space-y-1 text-xs text-palette-dark/75">
                      <span className="block">• <strong>Luxury 5 Star Hotels:</strong> World-class palace riads with spas and highest-end amenities.</span>
                      <span className="block">• <strong>Premium 4 Star Hotels:</strong> Atmospheric boutique riads with charming comfort and amenities.</span>
                      <span className="block">• <strong>Comfort 3 Star Hotels:</strong> Clean, authentic, hospitable rooms with essential conveniences.</span>
                    </span>
                  </span>
                </li>
              </ul>
              <div className="pt-4 border-t border-gray-100 text-xs text-palette-dark/80 italic font-light">
                Once we know these basic details we will put together an itinerary for you to review, with pricing, and hotel recommendations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24 bg-white border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold mb-2">
              Transparency First
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark mb-4">
              What's Included
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-6" />
            <p className="text-sm text-palette-dark/80 font-light leading-relaxed">
              Another core value of our business is transparency. Below we outline exactly what is and isn’t included in your tour package. We don’t believe in adding surprise charges to your bill once you’re here travelling with us in Morocco. The goal, always, is to help you enjoy the magic of Morocco without feeling stressed or anxious.
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif text-palette-dark text-center mb-8">
            What's Included In Your Tour Package:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Airport to Airport */}
            <div className="bg-palette-grayBg p-6 sm:p-8 rounded border border-palette-cream/80 flex items-start space-x-5">
              <div className="w-12 h-12 rounded-full bg-palette-navy/10 text-palette-navy flex items-center justify-center flex-shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-serif font-bold text-palette-dark uppercase tracking-wider">
                  Airport to Airport Service
                </h4>
                <p className="text-xs sm:text-sm text-palette-dark/80 font-light leading-relaxed">
                  All of our tours start and end at the airport so you don’t need to worry about a thing. We will meet you at arrivals and make sure you get back in time for your flight departure.
                </p>
              </div>
            </div>

            {/* Tour Leader */}
            <div className="bg-palette-grayBg p-6 sm:p-8 rounded border border-palette-cream/80 flex items-start space-x-5">
              <div className="w-12 h-12 rounded-full bg-palette-terracotta/10 text-palette-terracotta flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-serif font-bold text-palette-dark uppercase tracking-wider">
                  Tour Leader
                </h4>
                <p className="text-xs sm:text-sm text-palette-dark/80 font-light leading-relaxed">
                  Most of our trips are led by either an English-speaking driver, or a driver and an English-speaking National Guide who is fully licensed for guiding in Morocco. We offer a dedicated guide for groups of 4+ and to couples upon request.
                </p>
              </div>
            </div>

            {/* Accommodations */}
            <div className="bg-palette-grayBg p-6 sm:p-8 rounded border border-palette-cream/80 flex items-start space-x-5">
              <div className="w-12 h-12 rounded-full bg-palette-green/10 text-palette-green flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-serif font-bold text-palette-dark uppercase tracking-wider">
                  Accommodations
                </h4>
                <p className="text-xs sm:text-sm text-palette-dark/80 font-light leading-relaxed">
                  We include all hotels in your package (unless you request otherwise). Accommodations are based on your chosen tier and availability. We use only clean, local, authentic, highly-rated properties with whom we have personal relationships.
                </p>
              </div>
            </div>

            {/* Meals */}
            <div className="bg-palette-grayBg p-6 sm:p-8 rounded border border-palette-cream/80 flex items-start space-x-5">
              <div className="w-12 h-12 rounded-full bg-palette-sand/40 text-palette-dark flex items-center justify-center flex-shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-serif font-bold text-palette-dark uppercase tracking-wider">
                  Meals
                </h4>
                <p className="text-xs sm:text-sm text-palette-dark/80 font-light leading-relaxed">
                  All daily breakfasts are included, plus traditional dinners in remote southern areas and the Sahara desert. Your tour leader recommends clean, vetted restaurants for lunches and evening dining. Dietary restrictions (vegetarian, gluten-free) are catered for.
                </p>
              </div>
            </div>
          </div>

          {/* What's Not Included */}
          <div className="max-w-2xl mx-auto bg-amber-50/50 p-6 sm:p-8 rounded border border-amber-200">
            <h3 className="text-lg font-serif font-bold text-palette-dark mb-4 text-center">
              What's Not Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded border border-amber-100">
                <XCircle className="w-6 h-6 text-palette-terracotta mx-auto mb-1" />
                <span className="text-xs font-semibold uppercase tracking-wider text-palette-dark">Airfare</span>
              </div>
              <div className="p-3 bg-white rounded border border-amber-100">
                <XCircle className="w-6 h-6 text-palette-terracotta mx-auto mb-1" />
                <span className="text-xs font-semibold uppercase tracking-wider text-palette-dark">Travel Insurance</span>
              </div>
              <div className="p-3 bg-white rounded border border-amber-100">
                <XCircle className="w-6 h-6 text-palette-terracotta mx-auto mb-1" />
                <span className="text-xs font-semibold uppercase tracking-wider text-palette-dark">Tipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Book & Pay */}
      <section className="py-16 md:py-24 bg-palette-grayBg border-b border-palette-cream">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold">
              Simple &amp; Secure
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-palette-dark">
              How To Book &amp; Pay
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto" />
            <div className="space-y-4 text-sm sm:text-base text-palette-dark/85 font-light leading-relaxed text-left">
              <p>
                In order to secure your dates, we require a non-refundable small deposit of <strong>$550 USD</strong> to book. This can be paid by secure credit card link through an invoice.
              </p>
              <p>
                The balance is due in full 30 days in advance of your arrival date. We are happy to issue multiple invoices if you are friends travelling together. We will send you an invoice (less the deposit).
              </p>
              <p>
                There is a 5% service fee for credit card payment, and we also accept bank transfers or wire transfers to our US dollar account at our Canadian bank.
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

      {/* Quote Form */}
      <QuoteForm id="quote-form" />
    </div>
  );
};
