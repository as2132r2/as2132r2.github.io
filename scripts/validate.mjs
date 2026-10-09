import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const textExtensions = new Set([".html", ".css", ".md", ".mjs", ".py", ".sh", ""]);
const ignoredDirectories = new Set([".git", "tmp"]);
const forbidden = [
  /\b1[3-9]\d{9}\b/,
  /\/mnt\/LinuxData/,
  /\/home\/leo/,
  /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/,
  /(?:api|secret|access)[_-]?key\s*[:=]\s*["'][^"']{8,}/i,
];
const maxLines = 500;

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(root);
const errors = [];
for (const file of files) {
  if (!textExtensions.has(extname(file))) continue;
  const content = await readFile(file, "utf8");
  const lines = content.split(/\r?\n/).length;
  if (lines > maxLines) errors.push(`${relative(root, file)} has ${lines} lines (max ${maxLines})`);
  for (const pattern of forbidden) {
    if (pattern.test(content)) errors.push(`${relative(root, file)} matches forbidden pattern ${pattern}`);
  }
}

const html = await readFile(join(root, "index.html"), "utf8");
const version = (await readFile(join(root, "VERSION"), "utf8")).trim();
if (!html.includes(`v${version}`)) errors.push(`index.html does not reference VERSION ${version}`);

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const target = match[1];
  if (/^(?:https?:|mailto:|#)/.test(target)) continue;
  const localPath = resolve(root, decodeURIComponent(target.split("#")[0]));
  try { await stat(localPath); } catch { errors.push(`missing local asset: ${target}`); }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${files.length} files; version ${version}; privacy and ${maxLines}-line guards passed.`);
