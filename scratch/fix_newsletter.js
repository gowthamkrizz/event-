const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Samyuktha/Downloads/stackly-event-8_8383/stackly-event-8/event';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the inline onclick for the newsletter button so that script.js handles it properly.
  content = content.replace(/<button type="button" onclick="window\.location\.href='404\.html'"><i class="ph ph-paper-plane-right"><\/i><\/button>/g, 
                            '<button type="button"><i class="ph ph-paper-plane-right"></i></button>');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated newsletter button in ${file}`);
});
