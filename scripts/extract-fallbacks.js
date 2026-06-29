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

function getNested(obj, key) {
  return key.split('.').reduce((current, part) => {
    return current && Object.prototype.hasOwnProperty.call(current, part)
      ? current[part]
      : undefined;
  }, obj);
}

function stripHtml(html) {
  return html.replace(/\s+/g, ' ').trim();
}

function extractFromHtml(html) {
  const extracted = {};
  const patterns = [
    {
      regex: /<title[^>]*data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/title>/i,
      transform: (value) => stripHtml(value)
    },
    {
      regex: /<[^>]+data-i18n-html="([^"]+)"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
      transform: (value) => value.trim()
    },
    {
      regex: /<[^>]+data-i18n-placeholder="([^"]+)"[^>]*(?:placeholder="([^"]*)")?[^>]*>/gi,
      transform: (_, placeholder) => placeholder || ''
    },
    {
      regex: /<[^>]+data-i18n-alt="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi,
      transform: (_, alt) => alt || ''
    },
    {
      regex: /<[^>]+data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
      transform: (value) => stripHtml(value)
    }
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.regex.exec(html)) !== null) {
      const key = match[1];
      const value = pattern.transform(match[2], match[3]);
      if (value) {
        extracted[key] = value;
      }
    }
  }

  return extracted;
}

const enPath = path.join('lang', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const merged = JSON.parse(JSON.stringify(en));

for (const file of walk('.')) {
  const html = fs.readFileSync(file, 'utf8');
  const extracted = extractFromHtml(html);
  for (const [key, value] of Object.entries(extracted)) {
    if (getNested(merged, key) === undefined) {
      setNested(merged, key, value);
    }
  }
}

fs.writeFileSync(enPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log('Merged missing keys from HTML fallbacks into lang/en.json');
