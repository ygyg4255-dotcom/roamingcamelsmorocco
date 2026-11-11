import * as fs from 'fs';
import * as path from 'path';
import type { ExtendedRequest, ExtendedResponse } from './_utils';
import { parseBody, sendJson, checkAdminAuth, commitToGithub, generateConfigFile } from './_utils';

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

    const config = body.config || body;
    if (!config || typeof config !== 'object' || !config.ownerName) {
      sendJson(res, 400, { error: 'Invalid config payload: expected SiteConfig object' });
      return;
    }

    const fileContent = generateConfigFile(config);
    let savedToDisk = false;

    // 1. If local disk is accessible, save locally
    try {
      const candidates = [
        path.resolve(process.cwd(), 'src/data/siteConfig.ts'),
        path.resolve(process.cwd(), 'app/src/data/siteConfig.ts'),
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

    // 2. If GITHUB_TOKEN is set, commit directly to GitHub repository
    const githubResult = await commitToGithub(
      'app/src/data/siteConfig.ts',
      fileContent,
      `Update site config via Admin Portal (${config.ownerName})`
    );

    sendJson(res, 200, {
      success: true,
      savedToDisk,
      committedToGithub: githubResult.committed,
      commitUrl: githubResult.commitUrl,
      githubSha: githubResult.sha,
      warning: githubResult.error,
    });
  } catch (err: any) {
    sendJson(res, 500, {
      success: false,
      error: err?.message || 'Failed to save site config'
    });
  }
}
