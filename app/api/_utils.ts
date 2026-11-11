// Shared server-side utilities for Vercel Serverless Functions & local dev
import type { IncomingMessage, ServerResponse } from 'http';

export interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
  headers: Record<string, string | string[] | undefined>;
}

export interface ExtendedResponse extends ServerResponse {
  status?: (code: number) => ExtendedResponse;
  json?: (data: any) => ExtendedResponse;
}

export async function parseBody<T = any>(req: ExtendedRequest): Promise<T> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return req.body as unknown as T;
      }
    }
    return req.body as T;
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({} as T);
      }
    });
    req.on('error', () => {
      resolve({} as T);
    });
  });
}

export function sendJson(res: ExtendedResponse, status: number, data: any): void {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(data);
    return;
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function checkAdminAuth(req: ExtendedRequest, body?: any): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // 1. Authorization header (Bearer <password>)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && typeof authHeader === 'string') {
    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : authHeader;
    if (token === expectedPassword) {
      return true;
    }
  }

  // 2. Custom header
  const customHeader = req.headers['x-admin-password'];
  if (customHeader && customHeader === expectedPassword) {
    return true;
  }

  // 3. Request body password
  if (body && typeof body === 'object' && body.password && body.password === expectedPassword) {
    return true;
  }

  return false;
}

export async function commitToGithub(
  filePath: string,
  fileContent: string,
  commitMessage: string
): Promise<{ committed: boolean; commitUrl?: string; error?: string; sha?: string }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || 'ygyg4255-dotcom/roamingcamelsmorocco';
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token) {
    return {
      committed: false,
      error: 'GITHUB_TOKEN is not configured on this environment.'
    };
  }

  try {
    // 1. Fetch current file SHA if file already exists in branch
    const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'RoamingCamelsMorocco-Admin'
      }
    });

    let sha: string | undefined = undefined;
    if (getRes.ok) {
      const existing = (await getRes.json()) as { sha?: string };
      sha = existing.sha;
    }

    // 2. Put file to GitHub Contents API
    const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'RoamingCamelsMorocco-Admin'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(fileContent, 'utf-8').toString('base64'),
        sha,
        branch
      })
    });

    if (putRes.ok) {
      const result = (await putRes.json()) as { commit?: { html_url?: string; sha?: string } };
      return {
        committed: true,
        commitUrl: result.commit?.html_url,
        sha: result.commit?.sha
      };
    } else {
      const errText = await putRes.text();
      return {
        committed: false,
        error: `GitHub API error (${putRes.status}): ${errText}`
      };
    }
  } catch (err: any) {
    return {
      committed: false,
      error: err?.message || String(err)
    };
  }
}

export function generateToursFile(tours: any[]): string {
  return `import { Tour } from '../types';

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
}

export function generateConfigFile(config: any): string {
  return `export interface SiteConfig {
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
}
