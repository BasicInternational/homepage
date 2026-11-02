import fs from "fs";
import path from "path";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "scripts"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const stats = {
  files: 0,
  noSkip: [],
  noMain: [],
  noLang: [],
  imgNoAlt: [],
  voidHref: [],
  emptyAltDecorativeOk: 0,
  btnNoName: [],
  iframeNoTitle: [],
};

for (const file of walk(process.cwd())) {
  const rel = path.relative(process.cwd(), file).replaceAll("\\", "/");
  if (rel.includes("pages/include/")) continue;
  const html = fs.readFileSync(file, "utf8");
  stats.files++;

  if (!/\blang\s*=/i.test(html)) stats.noLang.push(rel);
  if (!/skip__content|본문 바로가기/i.test(html)) stats.noSkip.push(rel);
  if (!/<main[\s>]/i.test(html)) stats.noMain.push(rel);

  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=/i.test(m[1])) {
      stats.imgNoAlt.push(rel);
      break;
    }
  }

  if (/javascript:void\(0\)|href=["']#["']/i.test(html)) stats.voidHref.push(rel);

  for (const m of html.matchAll(/<button\b([^>]*)>/gi)) {
    const attrs = m[1];
    const hasName =
      /\baria-label\s*=/i.test(attrs) ||
      /\baria-labelledby\s*=/i.test(attrs) ||
      /\btitle\s*=/i.test(attrs);
    // text content checked separately is hard; flag icon-only likely buttons
    if (!hasName && /class=["'][^"']*bi__menu|nav__close|tol-btn/i.test(attrs)) {
      stats.btnNoName.push(rel);
    }
  }

  for (const m of html.matchAll(/<iframe\b([^>]*)>/gi)) {
    if (!/\btitle\s*=/i.test(m[1])) {
      stats.iframeNoTitle.push(rel);
      break;
    }
  }
}

console.log(
  JSON.stringify(
    {
      files: stats.files,
      counts: {
        noLang: stats.noLang.length,
        noSkip: stats.noSkip.length,
        noMain: stats.noMain.length,
        imgNoAlt: stats.imgNoAlt.length,
        voidHref: stats.voidHref.length,
        btnNoName: [...new Set(stats.btnNoName)].length,
        iframeNoTitle: stats.iframeNoTitle.length,
      },
      noSkip: stats.noSkip,
      noMain: stats.noMain,
      imgNoAlt: stats.imgNoAlt,
      voidHrefSample: stats.voidHref.slice(0, 15),
      btnNoName: [...new Set(stats.btnNoName)],
      iframeNoTitle: stats.iframeNoTitle,
    },
    null,
    2
  )
);
