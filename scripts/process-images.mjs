import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:\\Users\\abcd\\.gemini\\antigravity\\brain\\72cf0859-c799-4c26-ad2e-9f1ac446df95';
const TARGET_HERO = path.join(process.cwd(), 'public', 'assets', 'hero');
const TARGET_CASES = path.join(process.cwd(), 'public', 'assets', 'cases');

// Create directories if they don't exist
[TARGET_HERO, TARGET_CASES].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const files = fs.readdirSync(SOURCE_DIR);

const plans = [
  { prefix: 'hero_bg_', outname: 'hero-bg', target: TARGET_HERO, resize: [1920, 1080] },
  { prefix: 'case_doordash_', outname: 'case-doordash', target: TARGET_CASES, resize: [800, 600] },
  { prefix: 'case_founder_', outname: 'case-founder', target: TARGET_CASES, resize: [800, 600] },
  { prefix: 'case_agency_', outname: 'case-agency', target: TARGET_CASES, resize: [800, 600] },
  { prefix: 'process_bg_', outname: 'process-bg', target: TARGET_HERO, resize: [2560, 1080] },
  { prefix: 'close_bg_', outname: 'close-bg', target: TARGET_HERO, resize: [1200, 1200] },
];

async function processImages() {
  let hasErrors = false;
  for (const plan of plans) {
    let file = files.find(f => f.startsWith(plan.prefix) && f.endsWith('.png'));
    if (!file) {
      console.log(`Warning: Could not find file with prefix ${plan.prefix}, using fallback.`);
      file = files.find(f => f.startsWith('case_founder_') && f.endsWith('.png'));
      if (!file) {
         hasErrors = true;
         continue;
      }
    }
    const inputPath = path.join(SOURCE_DIR, file);
    const jpegOut = path.join(plan.target, `${plan.outname}.jpg`);
    const webpOut = path.join(plan.target, `${plan.outname}.webp`);

    console.log(`Processing ${file} -> ${plan.outname} (JPEG 90% progressive + WebP 85%)`);
    try {
      await sharp(inputPath)
        .resize({ width: plan.resize[0], height: plan.resize[1], fit: 'cover' })
        .jpeg({ quality: 90, progressive: true })
        .toFile(jpegOut);

      await sharp(inputPath)
        .resize({ width: plan.resize[0], height: plan.resize[1], fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(webpOut);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
      hasErrors = true;
    }
  }
  if (hasErrors) {
    process.exit(1);
  }
}

processImages();
