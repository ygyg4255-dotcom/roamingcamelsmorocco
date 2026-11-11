import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Save tours to src/data/tours.ts
        if (req.method === 'POST' && req.url === '/api/save-tours') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const tours = JSON.parse(body);
              const fileContent = `import { Tour } from '../types';

export const TOURS_DATA: Tour[] = ${JSON.stringify(tours, null, 2)};

const TOURS_STORAGE_KEY = 'rcm_tours_data';

export function getToursData(): Tour[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(TOURS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load tours from localStorage', e);
    }
  }
  return TOURS_DATA;
}

export function saveToursData(tours: Tour[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
      window.dispatchEvent(new Event('tours-data-updated'));
    } catch (e) {
      console.warn('Failed to save tours to localStorage', e);
    }
  }
}
`;
              const filePath = resolve(__dirname, 'src/data/tours.ts');
              fs.writeFileSync(filePath, fileContent, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: tours.length }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || String(err) }));
            }
          });
          return;
        }

        // Save site config to src/data/siteConfig.ts
        if (req.method === 'POST' && req.url === '/api/save-config') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const config = JSON.parse(body);
              const fileContent = `export interface SiteConfig {
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

export const DEFAULT_SITE_CONFIG: SiteConfig = ${JSON.stringify(config, null, 2)};

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
`;
              const filePath = resolve(__dirname, 'src/data/siteConfig.ts');
              fs.writeFileSync(filePath, fileContent, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || String(err) }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        moroccoTourFinder: resolve(__dirname, 'morocco-tour-finder/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        howWeWork: resolve(__dirname, 'how-we-work/index.html'),
        faq: resolve(__dirname, 'faq/index.html'),
        moroccoTravelGuide: resolve(__dirname, 'morocco-travel-guide/index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
});
