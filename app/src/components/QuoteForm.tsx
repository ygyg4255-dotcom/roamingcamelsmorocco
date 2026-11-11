import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send, Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../data/siteConfig';

interface QuoteFormProps {
  id?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ id = 'quote-form' }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('site-config-updated', handleUpdate);
    return () => window.removeEventListener('site-config-updated', handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelDates: '',
    days: '',
    adults: '2',
    children: '0',
    rooms: '1',
    hotelTier: 'premium',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id={id} className="py-20 bg-palette-grayBg text-palette-dark border-t border-palette-cream">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-palette-terracotta font-semibold mb-2">
            Tailor-Made Private Journeys
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-palette-dark mb-4">
            Let's personalize your Morocco trip for the perfect quote!
          </h2>
          <div className="w-16 h-0.5 bg-palette-terracotta mx-auto mb-6" />
          <p className="text-base sm:text-lg text-palette-dark/80 font-light italic">
            “We Understand Luxury Travel.”
          </p>
          <p className="text-sm text-palette-dark/70 mt-2 font-light">
            Every traveler is unique. Tell us about your group size, travel style, and preferred pace, and we will custom craft a seamless itinerary just for you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded shadow-md border border-palette-cream/80">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-palette-dark">Thank You, {formData.name || 'Traveler'}!</h3>
              <p className="text-palette-dark/80 max-w-md mx-auto text-sm leading-relaxed">
                We have received your trip details. {siteConfig.ownerName} will personally review your preferences and email your custom Morocco itinerary within 24 hours.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-wider font-semibold rounded inline-flex items-center space-x-1.5 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({siteConfig.phoneLocal})</span>
                </a>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="px-5 py-2.5 bg-palette-navy hover:bg-palette-dark text-white text-xs uppercase tracking-wider font-semibold rounded inline-flex items-center space-x-1.5 transition-colors shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {siteConfig.phoneLocal}</span>
                </a>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-gray-200 text-palette-dark text-xs uppercase tracking-widest font-semibold rounded hover:bg-gray-300 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    Your Travel Dates
                  </label>
                  <input
                    type="text"
                    value={formData.travelDates}
                    onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                    placeholder="e.g. Oct 15 - Oct 27 or Spring 2026"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    How Many Days? <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    placeholder="e.g. 10 Days"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    Number of Adults <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    Children (and ages)
                  </label>
                  <input
                    type="text"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    placeholder="e.g. 2 children (8, 12)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                    Number of Rooms <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                  />
                </div>
              </div>

              {/* Hotel Tier Choices */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-3">
                  Preferred Hotel Style <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'luxury',
                      title: 'Luxury 5★',
                      desc: 'Top boutique riads, palace hotels, opulent amenities',
                      badge: 'High-End'
                    },
                    {
                      id: 'premium',
                      title: 'Premium 4★',
                      desc: 'Authentic charming riads, excellent comfort & hospitality',
                      badge: 'Most Popular'
                    },
                    {
                      id: 'comfort',
                      title: 'Comfort 3★',
                      desc: 'Clean, safe, traditional guesthouses & essential amenities',
                      badge: 'Budget-Friendly'
                    }
                  ].map((tier) => (
                    <label
                      key={tier.id}
                      className={`relative flex flex-col p-4 rounded border cursor-pointer transition-all ${
                        formData.hotelTier === tier.id
                          ? 'border-palette-terracotta bg-palette-terracotta/5 shadow-sm ring-1 ring-palette-terracotta'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hotelTier"
                        value={tier.id}
                        checked={formData.hotelTier === tier.id}
                        onChange={(e) => setFormData({ ...formData, hotelTier: e.target.value })}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm text-palette-dark">{tier.title}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-palette-sand/40 text-palette-dark">
                          {tier.badge}
                        </span>
                      </div>
                      <p className="text-xs text-palette-dark/70 font-light mt-1">{tier.desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-palette-dark mb-2">
                  Anything Else You'd Like Us To Know?
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about special interests (photography, cooking, hiking, Amazigh culture), accessibility needs, or flight details..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-palette-terracotta hover:bg-[#853431] text-white text-xs tracking-widest font-semibold uppercase rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow hover:shadow-md"
                >
                  {loading ? (
                    <span>Submitting Your Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Get Your Free Personalized Quote</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-palette-dark/60 mt-2 font-light">
                  No obligation. 100% private. We never share your contact details.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Instant WhatsApp / Direct Call Banner */}
        <div className="max-w-3xl mx-auto mt-6 bg-white p-4 sm:p-5 rounded border border-palette-cream/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-palette-terracotta">Prefer Instant Messaging?</p>
            <p className="text-sm font-serif text-palette-dark font-medium">Chat directly with {siteConfig.ownerName} on WhatsApp</p>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded inline-flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ({siteConfig.phoneLocal})</span>
            </a>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="px-4 py-2 bg-palette-navy hover:bg-palette-dark text-white text-xs font-semibold rounded inline-flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
