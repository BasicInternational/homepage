import fs from "fs";
import path from "path";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".mjs") || entry.name.endsWith(".xml"))
      out.push(full);
  }
  return out;
}

const errors = [];
const warnings = [];

function checkHtml(rel, text) {
  // JSON-LD parse
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    i++;
    try {
      const data = JSON.parse(m[1]);
      // detect duplicate keys roughly by comparing stringify roundtrip length? skip
      if (data["@graph"] && !Array.isArray(data["@graph"])) {
        errors.push({ file: rel, type: "jsonld-graph-not-array", block: i });
      }
    } catch (err) {
      errors.push({
        file: rel,
        type: "jsonld-parse",
        block: i,
        msg: err.message,
        snippet: m[1].slice(0, 220).replace(/\s+/g, " "),
      });
    }
  }

  // FAQ section before </head> (bad inject)
  const headEnd = text.toLowerCase().indexOf("</head>");
  if (headEnd > -1) {
    const head = text.slice(0, headEnd);
    if (/class=["'][^"']*cms-faq|class=["'][^"']*aeo-faq/.test(head)) {
      errors.push({ file: rel, type: "faq-in-head" });
    }
  }

  // duplicate canonical links
  const cans = text.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) || [];
  if (cans.length > 1) errors.push({ file: rel, type: "dup-canonical", count: cans.length });

  // duplicate alternate llms-full in head only
  const headOnly = headEnd > -1 ? text.slice(0, headEnd) : text;
  const altFull = (headOnly.match(/href=["']https:\/\/basicit\.co\.kr\/llms-full\.txt["']/g) || []).length;
  if (altFull > 1) warnings.push({ file: rel, type: "dup-llms-full-head", count: altFull });

  // real img tags without alt (ignore comments)
  const noComments = text.replace(/<!--[\s\S]*?-->/g, "");
  for (const img of noComments.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=/i.test(img[1])) {
      warnings.push({ file: rel, type: "img-no-alt", tag: img[0].slice(0, 140) });
    }
  }

  // duplicate addressRegion keys adjacent pattern
  if (
    /"addressRegion"\s*:\s*"[^"]+"\s*,\s*"addressLocality"\s*:\s*"[^"]+"\s*,\s*"addressRegion"/.test(
      text
    )
  ) {
    errors.push({ file: rel, type: "dup-addressRegion" });
  }

  // wrong v2v canonical leftover
  if (rel.includes("v2v") && /canonical[^>]+sync-sll\.html/i.test(text)) {
    errors.push({ file: rel, type: "wrong-canonical-v2v" });
  }

  // mismatched FAQ schema product names on v2v
  if (rel.endsWith("pages/sync/v2v.html") && /"name":\s*"SYNC SSL"/.test(text)) {
    errors.push({ file: rel, type: "v2v-ssl-schema-leftover" });
  }
}

for (const file of walk(process.cwd())) {
  const rel = path.relative(process.cwd(), file).replaceAll("\\", "/");
  const text = fs.readFileSync(file, "utf8");

  if (rel.endsWith(".html")) checkHtml(rel, text);

  if (rel.endsWith(".mjs")) {
    // ensure import paths referenced later exist? skip
    if (text.includes("\u0000")) errors.push({ file: rel, type: "null-byte" });
  }

  if (rel.endsWith("sitemap.xml")) {
    // dead pages referenced?
    for (const loc of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = loc[1];
      if (url.endsWith(".txt")) continue;
      const local = url.replace("https://basicit.co.kr/", "").replace(/\/$/, "index.html");
      const candidate =
        local === "" || local === "index.html"
          ? path.join(process.cwd(), "index.html")
          : path.join(process.cwd(), local.replace(/\//g, path.sep));
      if (!fs.existsSync(candidate) && !url.endsWith("/")) {
        // also try with trailing path
        warnings.push({ file: rel, type: "sitemap-missing-file", url });
      }
    }
  }
}

console.log(
  JSON.stringify(
    {
      errorCount: errors.length,
      warningCount: warnings.length,
      errors,
      warnings,
    },
    null,
    2
  )
);
