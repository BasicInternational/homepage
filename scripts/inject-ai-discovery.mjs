import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SKIP = new Set([
  "public.html",
  "pages/experience/test.html",
  "pages/aiservice/ai-book_old.html",
  "pages/aiservice/ai-book_new.html",
  "pages/aiservice/aisound_old.html",
  "pages/sync/sync-boot-old.html",
  "pages/include/header.html",
  "pages/include/footer.html",
  "pages/include/floating-menu.html",
  "googlecfec6b48ae0b2395.html",
]);

const LINKS = `
  <link rel="alternate" type="text/plain" href="https://basicit.co.kr/llms.txt" title="llms.txt" />
  <link rel="alternate" type="text/plain" href="https://basicit.co.kr/llms-full.txt" title="llms-full.txt" />
  <link rel="describedby" href="https://basicit.co.kr/pages/aboutus/ai-profile.html" title="AI company profile" />
`.trim();

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

let added = 0;
let skipped = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  if (SKIP.has(rel) || rel.startsWith("pages/include/")) {
    skipped++;
    continue;
  }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('href="https://basicit.co.kr/llms-full.txt"')) {
    skipped++;
    continue;
  }

  if (html.includes('href="https://basicit.co.kr/llms.txt"')) {
    // upgrade existing single llms link
    html = html.replace(
      /<link rel="alternate" type="text\/plain" href="https:\/\/basicit\.co\.kr\/llms\.txt"[^>]*>\s*/i,
      `${LINKS}\n  `
    );
  } else if (/<link rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(/(<link rel="canonical"[^>]*>)/i, `$1\n  ${LINKS}`);
  } else if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `  ${LINKS}\n</head>`);
  } else {
    skipped++;
    continue;
  }

  // light AI signal meta if missing
  if (!html.includes('name="ai-content"') && !html.includes("name='ai-content'")) {
    html = html.replace(
      /(<meta name="robots"[^>]*>)/i,
      `$1\n  <meta name="ai-content" content="indexable, citable" />`
    );
  }

  fs.writeFileSync(file, html, "utf8");
  added++;
  console.log("updated", rel);
}

console.log(JSON.stringify({ added, skipped }, null, 2));
