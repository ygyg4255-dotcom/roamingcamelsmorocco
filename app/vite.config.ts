import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

function checkAuth(req: any, bodyObj?: any): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader && typeof authHeader === 'string') {
    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : authHeader;
    if (token === expectedPassword) return true;
  }
  const customHeader = req.headers['x-admin-password'];
  if (customHeader && customHeader === expectedPassword) return true;
  if (bodyObj && bodyObj.password && bodyObj.password === expectedPassword) return true;
  return false;
}

function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        const pathname = rawUrl.split('?')[0].replace(/\/+$/, '');

        // 1. POST /api/verify-admin
        if (req.method === 'POST' && pathname === '/api/verify-admin') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = body ? JSON.parse(body) : {};
              if (checkAuth(req, parsed)) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ valid: true, message: 'Admin verified successfully' }));
              } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ valid: false, error: 'Invalid admin credentials' }));
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || String(err) }));
            }
          });
          return;
        }

        // 2. POST /api/save-tours
        if (req.method === 'POST' && pathname === '/api/save-tours') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const parsed = body ? JSON.parse(body) : [];
              const tours = Array.isArray(parsed) ? parsed : parsed.tours || [];

              if (!checkAuth(req, parsed)) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Unauthorized: invalid or missing admin credentials' }));
                return;
              }

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
              res.end(JSON.stringify({ success: true, count: tours.length, savedToDisk: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || String(err) }));
            }
          });
          return;
        }

        // 3. POST /api/save-config
        if (req.method === 'POST' && pathname === '/api/save-config') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const parsed = body ? JSON.parse(body) : {};
              const config = parsed.config || parsed;

              if (!checkAuth(req, parsed)) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Unauthorized: invalid or missing admin credentials' }));
                return;
              }

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
              res.end(JSON.stringify({ success: true, savedToDisk: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || String(err) }));
            }
          });
          return;
        }

        // 4. GET /api/get-data
        if (req.method === 'GET' && pathname === '/api/get-data') {
          try {
            const toursFilePath = resolve(__dirname, 'src/data/tours.ts');
            const configFilePath = resolve(__dirname, 'src/data/siteConfig.ts');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              available: fs.existsSync(toursFilePath) && fs.existsSync(configFilePath),
              timestamp: new Date().toISOString()
            }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || String(err) }));
          }
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
