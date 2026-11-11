import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faq';
import { QuoteForm } from '../components/QuoteForm';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['entry-requirements', 'currency']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const matchQ = item.question.toLowerCase().includes(q);
    const matchA = item.answer.some((ans) => ans.toLowerCase().includes(q));
    return matchQ || matchA;
  });

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
            Travel Advice &amp; Tips
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-palette-cream/90 font-light max-w-xl mx-auto">
            Everything you need to know about preparing for your private Moroccan tour.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 md:py-24 bg-white border-b border-palette-cream">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-palette-dark mb-4">
              Have Questions? We Have Answers
            </h2>
            <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-6" />
            <p className="text-sm text-palette-dark/75 font-light">
              Click on any topic below to learn more about visas, money, safety, local customs, and packing.
            </p>

            {/* Quick search filter */}
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search questions (e.g. visa, currency, clothing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-palette-navy"
              />
            </div>
          </div>

          {/* Accordion list */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-sm overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-palette-grayBg/60 hover:bg-palette-grayBg transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-palette-dark tracking-wide uppercase">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-palette-terracotta transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 bg-white border-t border-gray-100 space-y-3">
                      {faq.answer.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-xs sm:text-sm text-palette-dark/85 font-light leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Box */}
          <div className="mt-16 p-8 sm:p-10 bg-palette-navy text-white text-center rounded-sm shadow-md space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wider uppercase">
              Still Have Questions?
            </h2>
            <p className="text-xs sm:text-sm text-palette-cream/80 max-w-lg mx-auto font-light leading-relaxed">
              We know planning an international trip can bring up unique questions. Our team is always happy to jump on a call or email to chat through your ideas.
            </p>
            <div className="pt-2">
              <a
                href="#quote-form"
                className="inline-block px-7 py-3 bg-palette-sand hover:bg-palette-gold text-palette-dark text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow"
              >
                Get In Touch
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
