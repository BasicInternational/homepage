import fs from "fs";
import path from "path";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const bad = [];
const stats = { files: 0, blocks: 0, withFaq: 0, withOldGeo: 0, missingGeo: 0 };

for (const file of walk(process.cwd())) {
  stats.files++;
  const rel = path.relative(process.cwd(), file).replaceAll("\\", "/");
  const html = fs.readFileSync(file, "utf8");
  if (html.includes("37.5665")) stats.withOldGeo++;
  if (
    !rel.includes("include/") &&
    !html.includes("geo.position") &&
    !rel.startsWith("google")
  ) {
    stats.missingGeo++;
    bad.push({ file: rel, err: "missing-geo-meta" });
  }
  if (html.includes("FAQPage") || html.includes("자주 묻는 질문")) stats.withFaq++;

  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m;
  let i = 0;
  while ((m = re.exec(html))) {
    i++;
    stats.blocks++;
    try {
      JSON.parse(m[1]);
    } catch (err) {
      bad.push({ file: rel, block: i, err: err.message });
    }
  }
}

console.log(JSON.stringify({ stats, bad }, null, 2));
