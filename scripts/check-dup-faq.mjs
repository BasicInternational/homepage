import fs from "fs";
import path from "path";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const list = [];
for (const file of walk(process.cwd())) {
  const text = fs.readFileSync(file, "utf8");
  const n = (text.match(/"@type"\s*:\s*"FAQPage"/g) || []).length;
  if (n > 1) {
    list.push({
      file: path.relative(process.cwd(), file).replaceAll("\\", "/"),
      count: n,
    });
  }
}
console.log(JSON.stringify({ multiFaqPages: list.length, list }, null, 2));
