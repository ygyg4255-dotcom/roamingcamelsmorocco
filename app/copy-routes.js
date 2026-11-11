import fs from 'fs';
import path from 'path';

// Mirror dist to out so both out/ and dist/ contain the static output
const distDir = path.resolve('dist');
const outDir = path.resolve('out');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(distDir)) {
  copyDir(distDir, outDir);
  console.log('✓ Successfully mirrored dist/ to out/');
}
