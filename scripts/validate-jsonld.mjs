import fs from 'fs';

const files = [
  'index.html',
  'pages/aboutus/ai-profile.html',
  'pages/sync/aiops.html',
  'pages/sync/sync-any.html',
];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) {
    console.error(`FAIL ${file}: no JSON-LD`);
    process.exitCode = 1;
    continue;
  }
  for (const [i, block] of blocks.entries()) {
    try {
      const data = JSON.parse(block[1]);
      const types = Array.isArray(data['@graph'])
        ? data['@graph'].map((x) => x['@type'])
        : [data['@type']];
      console.log(`OK ${file}#${i + 1}`, types.flat().join(', '));
    } catch (err) {
      console.error(`FAIL ${file}#${i + 1}:`, err.message);
      process.exitCode = 1;
    }
  }
}
