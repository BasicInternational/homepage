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

const pattern =
  /"addressRegion"\s*:\s*"서울",\s*"addressLocality"\s*:\s*"금천구",\s*"addressRegion"\s*:\s*"서울특별시"/g;

const replacement = `"streetAddress": "벚꽃로 368, 가산SKV1 701~708호",
              "addressLocality": "금천구",
              "addressRegion": "서울특별시",
              "postalCode": "08511"`;

let count = 0;
for (const file of walk(process.cwd())) {
  let html = fs.readFileSync(file, "utf8");
  if (!pattern.test(html)) continue;
  pattern.lastIndex = 0;
  html = html.replace(pattern, replacement);
  fs.writeFileSync(file, html, "utf8");
  count++;
  console.log("fixed", path.relative(process.cwd(), file));
}
console.log("count", count);
