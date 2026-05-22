import { readFile } from 'node:fs/promises';

const TIMEOUT_MS = 15000;
const MAX_CONCURRENCY = 5;
const OK_STATUSES = new Set([200, 201, 202, 203, 204, 206, 301, 302, 303, 307, 308]);

const html = await readFile('index.html', 'utf8');
const eventData = JSON.parse(await readFile('data/events.json', 'utf8'));

const links = new Map();

function addLink(url, source) {
  if (!url || typeof url !== 'string') return;
  if (!/^https?:\/\//i.test(url)) return;
  const normalized = url.trim();
  if (!links.has(normalized)) links.set(normalized, new Set());
  links.get(normalized).add(source);
}

for (const match of html.matchAll(/href="([^"]+)"/g)) {
  addLink(match[1], 'index.html href');
}

for (const match of html.matchAll(/url\("([^"]+)"\)/g)) {
  addLink(match[1], 'index.html CSS url');
}

for (const [index, event] of (eventData.events || []).entries()) {
  addLink(event.eventUrl, `data/events.json events[${index}].eventUrl (${event.title || 'untitled'})`);
  addLink(event.mapUrl, `data/events.json events[${index}].mapUrl (${event.title || 'untitled'})`);
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 link-checker; FamilyAdventureSearch/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkLink(url, sources) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url);
      if (OK_STATUSES.has(response.status) || (response.status >= 200 && response.status < 400)) {
        return { ok: true, url, status: response.status };
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.name === 'AbortError' ? `timeout after ${TIMEOUT_MS}ms` : error.message;
    }
  }
  return { ok: false, url, error: lastError, sources: [...sources] };
}

async function runPool(entries) {
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < entries.length) {
      const entry = entries[cursor];
      cursor += 1;
      results.push(await checkLink(entry[0], entry[1]));
    }
  }
  await Promise.all(Array.from({ length: Math.min(MAX_CONCURRENCY, entries.length) }, worker));
  return results;
}

const entries = [...links.entries()];
console.log(`Checking ${entries.length} unique links...`);
const results = await runPool(entries);
const failures = results.filter((result) => !result.ok);

for (const result of results.filter((item) => item.ok).sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(`OK ${result.status} ${result.url}`);
}

if (failures.length) {
  console.error('\nBroken or unreachable links:');
  for (const failure of failures.sort((a, b) => a.url.localeCompare(b.url))) {
    console.error(`- ${failure.url}`);
    console.error(`  ${failure.error}`);
    console.error(`  Sources: ${failure.sources.join('; ')}`);
  }
  process.exit(1);
}

console.log('\nAll links are active.');
