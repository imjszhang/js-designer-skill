// Direct DashScope wanx image generation
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.DASHSCOPE_API_KEY;
const OUTPUT_BASE = path.resolve(__dirname, '../work_dir/generated_images_gpt_image_2');

if (!apiKey) {
  console.error('请设置环境变量 DASHSCOPE_API_KEY');
  process.exit(1);
}

// First create an async task
function createTask(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'wanx2.1-t2i-turbo',
      input: { prompt },
      parameters: {
        n: 1,
        size: '1024*1024',
        negative_prompt: 'blurry, low quality, watermark'
      }
    });

    const req = https.request({
      hostname: 'dashscope.aliyuncs.com',
      port: 443,
      path: '/api/v1/services/aigc/text2image/image-synthesis',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-DashScope-Async': 'enable',
        'Content-Length': Buffer.byteLength(body)
      },
      timeout: 30000
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        console.log(`Create task status: ${res.statusCode}`);
        console.log(raw);
        if (res.statusCode === 200) {
          const data = JSON.parse(raw);
          if (data.output && data.output.task_id) {
            resolve(data.output.task_id);
          } else {
            reject(new Error('No task_id in response: ' + raw));
          }
        } else {
          reject(new Error(raw));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function getTaskResult(taskId) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'dashscope.aliyuncs.com',
      port: 443,
      path: `/api/v1/tasks/${taskId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 30000
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        console.log(`Task ${taskId} status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          resolve(JSON.parse(raw));
        } else {
          reject(new Error(raw));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buf);
        console.log(`Saved: ${outputPath} (${buf.length} bytes)`);
        resolve(outputPath);
      });
    });
    req.on('error', reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error('Download timeout')); });
  });
}

async function generateSlide(prompt, sessionName, slideName) {
  console.log(`\n=== ${slideName} ===`);
  const outputDir = path.join(OUTPUT_BASE, sessionName);
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Creating task...');
  const taskId = await createTask(prompt);
  console.log('Task ID:', taskId);

  // Poll for completion
  for (let attempt = 0; attempt < 60; attempt++) {
    await new Promise(r => setTimeout(r, 5000));
    const result = await getTaskResult(taskId);
    const status = result.output?.task_status;
    console.log(`  Attempt ${attempt + 1}: status=${status}`);
    
    if (status === 'SUCCEEDED') {
      const results = result.output.results || [];
      if (results.length > 0 && results[0].url) {
        const imgPath = path.join(outputDir, '01.png');
        await downloadImage(results[0].url, imgPath);
        return imgPath;
      }
    }
    if (status === 'FAILED' || status === 'CANCELED') {
      throw new Error(`Task failed: ${JSON.stringify(result.output)}`);
    }
  }
  throw new Error('Task did not complete in time');
}

async function main() {
  try {
    // Test with first slide
    const result = await generateSlide(
      'AIPOCH presentation slide, Frame layout, 16:9 safe frame. Warm #FCFCFA canvas. Title: 历史复盘. Horizontal timeline with three equal stages: 岗位化 2006-2012, 工业化 2013-2017, 中台化 2018-2022. Lucide-style outline icons. One #FBDD67 accent only. No global hard shadows.',
      'board-v2-04',
      'Slide 4 - 历史复盘'
    );
    console.log('\nGenerated:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
