const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      if (entry !== 'node_modules' && entry !== 'scripts') {
        walk(fullPath, files);
      }
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function getNested(obj, key) {
  return key.split('.').reduce((current, part) => {
    return current && Object.prototype.hasOwnProperty.call(current, part)
      ? current[part]
      : undefined;
  }, obj);
}

function setNested(obj, key, value) {
  const parts = key.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

const attrPattern = /data-i18n(?:-html|-placeholder|-alt|-title)?="([^"]+)"/g;
const keys = new Map();

for (const file of walk('.')) {
  const html = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = attrPattern.exec(html)) !== null) {
    keys.set(match[1], true);
  }
}

const enPath = path.join('lang', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const missing = [...keys.keys()].filter((key) => getNested(en, key) === undefined).sort();

console.log('Total keys in HTML:', keys.size);
console.log('Missing from en.json:', missing.length);
if (missing.length) {
  console.log(missing.join('\n'));
  process.exitCode = 1;
}
