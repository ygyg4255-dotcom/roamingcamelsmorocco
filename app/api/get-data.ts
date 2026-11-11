import type { ExtendedRequest, ExtendedResponse } from './_utils';
import { sendJson } from './_utils';
import { TOURS_DATA } from '../src/data/tours';
import { DEFAULT_SITE_CONFIG } from '../src/data/siteConfig';

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method Not Allowed' });
    return;
  }

  try {
    sendJson(res, 200, {
      success: true,
      tours: TOURS_DATA,
      config: DEFAULT_SITE_CONFIG,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    sendJson(res, 500, {
      success: false,
      error: err?.message || 'Failed to retrieve site data'
    });
  }
}
