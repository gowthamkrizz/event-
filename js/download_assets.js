const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '..', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const assets = {
  'about-banner.webp': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80',
  'gallery-1.webp': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
  'gallery-2.webp': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80',
  'gallery-3.webp': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80',
  'gallery-4.webp': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
  'gallery-5.webp': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80',
  'avatar-1.webp': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  'avatar-2.webp': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
  'avatar-3.webp': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
  'avatar-4.webp': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
  'avatar-5.webp': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
};

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(IMAGES_DIR, filename);
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting image downloads...');
  for (const [filename, url] of Object.entries(assets)) {
    try {
      await download(url, filename);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
  console.log('Image download process complete.');
}

run();
