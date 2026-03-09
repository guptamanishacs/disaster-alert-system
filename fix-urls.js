const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'frontend', 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
const importLine = "import API_URL from '../config';";
let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('http://localhost:5000')) return;

  // Replace double-quoted strings: "http://localhost:5000/api/..." → `${API_URL}/...`
  content = content.replace(/"http:\/\/localhost:5000\/api([^"]*)"/g, '`${API_URL}$1`');

  // Replace template literal starts: `http://localhost:5000/api → `${API_URL}
  content = content.replace(/`http:\/\/localhost:5000\/api/g, '`${API_URL}');

  // Add import if not already present
  if (!content.includes('import API_URL')) {
    const lines = content.split('\n');
    let lastImport = -1;
    lines.forEach((l, i) => { if (l.startsWith('import ')) lastImport = i; });
    if (lastImport >= 0) lines.splice(lastImport + 1, 0, importLine);
    else lines.unshift(importLine);
    content = lines.join('\n');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('FIXED: ' + file);
  totalFixed++;
});
console.log('Done! Fixed ' + totalFixed + ' files.');
