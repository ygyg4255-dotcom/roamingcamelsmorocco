import * as fs from 'fs';
import * as path from 'path';
import type { ExtendedRequest, ExtendedResponse } from './_utils';
import { parseBody, sendJson, checkAdminAuth, commitToGithub, generateToursFile } from './_utils';

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
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

    if (!checkAdminAuth(req, body)) {
      sendJson(res, 401, { error: 'Unauthorized: invalid or missing admin credentials' });
      return;
    }

    const tours = Array.isArray(body) ? body : body.tours || [];
    if (!Array.isArray(tours) || tours.length === 0) {
      sendJson(res, 400, { error: 'Invalid tours payload: expected non-empty array' });
      return;
    }

    const fileContent = generateToursFile(tours);
    let savedToDisk = false;

    // 1. If local disk is accessible (development / node server), save locally
    try {
      const candidates = [
        path.resolve(process.cwd(), 'src/data/tours.ts'),
        path.resolve(process.cwd(), 'app/src/data/tours.ts'),
      ];
      for (const target of candidates) {
        if (fs.existsSync(path.dirname(target))) {
          fs.writeFileSync(target, fileContent, 'utf-8');
          savedToDisk = true;
          break;
        }
      }
    } catch {
      // In read-only serverless lambdas fs write might fail, which is expected
    }

    // 2. If GITHUB_TOKEN is set, commit directly to GitHub repository (works anywhere from phone/desktop)
    const githubResult = await commitToGithub(
      'app/src/data/tours.ts',
      fileContent,
      `Update tours data via Admin Portal (${tours.length} tours)`
    );

    sendJson(res, 200, {
      success: true,
      count: tours.length,
      savedToDisk,
      committedToGithub: githubResult.committed,
      commitUrl: githubResult.commitUrl,
      githubSha: githubResult.sha,
      warning: githubResult.error,
    });
  } catch (err: any) {
    sendJson(res, 500, {
      success: false,
      error: err?.message || 'Failed to save tours data'
    });
  }
}
