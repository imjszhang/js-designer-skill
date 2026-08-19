/**
 * Generate 5 board presentation slides via LLMCORE gpt-image-2
 *
 * Style reference: references/aipoch/DESIGN.md
 * Slide data: lib/boardSlides.js
 */
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const { slides, assertAipochAssets } = require('../lib/boardSlides');

const BASE_URL = (process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, '');
const API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_BASE = path.resolve(__dirname, '../work_dir/generated_images_gpt_image_2');

if (!API_KEY) {
  console.error('请设置环境变量 OPENAI_API_KEY');
  process.exit(1);
}

try {
  assertAipochAssets();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

function requestImage(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1536x1024',
      quality: 'high'
    });

    const url = new URL(BASE_URL + '/images/generations');
    const req = https.request({
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(body)
      },
      timeout: 300000
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 300)}`));
          return;
        }
        try {
          const data = JSON.parse(raw);
          resolve(data);
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.write(body);
    req.end();
  });
}

function saveB64Image(b64, outputPath) {
  const cleaned = b64.replace(/^data:image\/[a-z+]+;base64,/, '');
  const buffer = Buffer.from(cleaned, 'base64');
  
  // Detect format by magic bytes
  let ext = 'png';
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) ext = 'jpg';
  else if (buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) ext = 'png';
  else if (buffer.toString('utf8', 0, 5) === '<?xml') ext = 'svg';
  
  const finalPath = path.dirname(outputPath) + '/' + path.basename(outputPath, path.extname(outputPath)) + '.' + ext;
  fs.writeFileSync(finalPath, buffer);
  console.log(`Saved: ${finalPath} (${buffer.length} bytes)`);
  return finalPath;
}

async function generateSlide(prompt, sessionName, slideName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Generating: ${slideName}`);
  console.log(`${'='.repeat(60)}`);
  
  const outputDir = path.join(OUTPUT_BASE, sessionName);
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Retry with backoff
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Attempt ${attempt}/3...`);
      const response = await requestImage(prompt);
      
      if (!response.data || !response.data[0]) {
        throw new Error('No image data in response: ' + JSON.stringify(response).substring(0, 200));
      }
      
      const item = response.data[0];
      
      if (item.b64_json) {
        const outPath = path.join(outputDir, '01.png');
        const savedPath = saveB64Image(item.b64_json, outPath);
        console.log(`SUCCESS: ${savedPath}`);
        return savedPath;
      } else if (item.url) {
        const ext = path.extname(new URL(item.url).pathname) || '.png';
        const outPath = path.join(outputDir, '01' + ext);
        await downloadImage(item.url, outPath);
        console.log(`SUCCESS: ${outPath}`);
        return outPath;
      } else {
        throw new Error('No b64_json or url in response: ' + Object.keys(item).join(', '));
      }
    } catch (e) {
      lastError = e;
      console.error(`Failed: ${e.message}`);
      if (attempt < 3) {
        const delay = attempt * 3000;
        console.log(`Retrying in ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  
  throw new Error(`All attempts failed: ${lastError.message}`);
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buf);
        resolve(outputPath);
      });
    }).on('error', reject).setTimeout(120000, () => reject(new Error('Download timeout')));
  });
}

async function main() {
  const results = [];
  for (const slide of slides) {
    try {
      const savedPath = await generateSlide(slide.prompt, slide.session, slide.name);
      results.push({ slide: slide.name, path: savedPath, status: 'success' });
      // Wait between slides
      if (slides.indexOf(slide) < slides.length - 1) {
        console.log('\nWaiting 5 seconds before next slide...');
        await new Promise(r => setTimeout(r, 5000));
      }
    } catch (err) {
      results.push({ slide: slide.name, error: err.message, status: 'failed' });
      console.error(`FAILED: ${slide.name}: ${err.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  for (const r of results) {
    if (r.status === 'success') {
      console.log(`✓ ${r.slide} -> ${r.path}`);
    } else {
      console.log(`✗ ${r.slide}: ${r.error}`);
    }
  }
}

main().then(() => process.exit(0)).catch(e => { console.error('Fatal:', e); process.exit(1); });
