/**
 * Generate a single board slide via LLMCORE gpt-image-2
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

const slideIndex = parseInt(process.argv[2]) || 0;

try {
  assertAipochAssets();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

if (slideIndex < 0 || slideIndex >= slides.length) {
  console.error(`Slide index ${slideIndex} out of range (0-${slides.length - 1})`);
  process.exit(1);
}

const slide = slides[slideIndex];
console.log(`Generating: ${slide.name} (index ${slideIndex})`);
console.log(`Session: ${slide.session}`);
console.log(`Prompt: ${slide.prompt.substring(0, 100)}...`);

function requestImage(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1536x1024',
      quality: 'high'
    });

    const url = new URL(`${BASE_URL}/images/generations`);
    const req = https.request({
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
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
        resolve(JSON.parse(raw));
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
  
  let ext = 'png';
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) ext = 'jpg';
  else if (buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) ext = 'png';
  else if (buffer.toString('utf8', 0, 5) === '<?xml') ext = 'svg';
  
  const finalPath = path.dirname(outputPath) + '/' + path.basename(outputPath, path.extname(outputPath)) + '.' + ext;
  fs.writeFileSync(finalPath, buffer);
  console.log(`Saved: ${finalPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
  return finalPath;
}

async function main() {
  const outputDir = path.join(OUTPUT_BASE, slide.session);
  fs.mkdirSync(outputDir, { recursive: true });
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`\nAttempt ${attempt}/3...`);
      const response = await requestImage(slide.prompt);
      
      if (!response.data || !response.data[0]) {
        throw new Error('No image data: ' + JSON.stringify(response).substring(0, 200));
      }
      
      const item = response.data[0];
      if (item.b64_json) {
        const savedPath = saveB64Image(item.b64_json, path.join(outputDir, '01.png'));
        console.log(`SUCCESS: ${savedPath}`);
        process.exit(0);
      } else if (item.url) {
        const ext = path.extname(new URL(item.url).pathname) || '.png';
        const outPath = path.join(outputDir, '01' + ext);
        await new Promise((resolve, reject) => {
          https.get(item.url, (res) => {
            if (res.statusCode !== 200) { reject(new Error('Download failed')); return; }
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => {
              fs.writeFileSync(outPath, Buffer.concat(chunks));
              console.log(`Saved: ${outPath}`);
              resolve(outPath);
            });
          }).on('error', reject).setTimeout(120000, () => reject(new Error('Download timeout')));
        });
        process.exit(0);
      } else {
        throw new Error('No b64_json or url: ' + Object.keys(item).join(', '));
      }
    } catch (e) {
      console.error(`Attempt ${attempt} failed: ${e.message}`);
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, attempt * 5000));
      }
    }
  }
  
  console.error('ALL ATTEMPTS FAILED');
  process.exit(1);
}

main();
