export interface Tour {
  id: string;
  slug: string;
  title: string;
  duration: string; // e.g., "18 Days", "12 Days", "Day Trip", etc.
  durationDays: number;
  departureCity: string; // e.g., "Casablanca", "Marrakech", "Fes", "Tangier"
  destinations: string[]; // e.g., ["Chefchaouen", "Sahara Desert", "Marrakech", "Atlas Mountains"]
  tourType: 'desert' | 'extended' | 'day-trip' | 'custom';
  image: string;
  description: string;
  price?: number; // numeric price (USD)
  priceEstimate?: string;
  isCancelled?: boolean; // toggle hidden/cancelled status
  link: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string[];
}

export interface Review {
  id: string;
  title: string;
  author: string;
  quote: string;
  tour: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  link: string;
}
