export interface SiteConfig {
  ownerName: string;
  phoneLocal: string;
  phoneIntl: string;
  phoneTel: string;
  whatsappLink: string;
  email: string;
  instagramUsername: string;
  instagramUrl: string;
  location: string;
  addressTitle?: string;
  addressFull?: string;
  officeHours?: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  "phoneLocal": "0659307677",
  "phoneTel": "+212659307677",
  "phoneIntl": "+212 659-307677",
  "location": "Morocco",
  "ownerName": "Mohammed El Kouih",
  "instagramUrl": "https://www.instagram.com/_mohammed____cb/",
  "whatsappLink": "https://wa.me/212659307677",
  "instagramUsername": "@_mohammed____cb",
  "email": "mohammedlakouaihi000@gmail.com"
};

const STORAGE_KEY = 'rcm_site_config';

export function getSiteConfig(): SiteConfig {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load site config from localStorage', e);
    }
  }
  return DEFAULT_SITE_CONFIG;
}

export function saveSiteConfig(config: SiteConfig): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      window.dispatchEvent(new Event('site-config-updated'));
    } catch (e) {
      console.warn('Failed to save site config to localStorage', e);
    }
  }
}
