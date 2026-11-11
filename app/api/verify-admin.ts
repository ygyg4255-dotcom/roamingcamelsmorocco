import type { ExtendedRequest, ExtendedResponse } from './_utils';
import { parseBody, sendJson, checkAdminAuth } from './_utils';

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = await parseBody(req);
    const isValid = checkAdminAuth(req, body);

    if (isValid) {
      sendJson(res, 200, {
        valid: true,
        message: 'Admin authorization verified successfully'
      });
    } else {
      sendJson(res, 401, {
        valid: false,
        error: 'Invalid admin password'
      });
    }
  } catch (err: any) {
    sendJson(res, 500, {
      valid: false,
      error: err?.message || 'Server error during authentication'
    });
  }
}
