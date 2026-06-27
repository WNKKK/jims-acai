import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

fs.mkdirSync(dist, { recursive: true });

const files = [
  ["jims-acai-customer.html", "index.html"],
  ["jims-acai-customer.html", "jims-acai-customer.html"],
  ["manifest.webmanifest", "manifest.webmanifest"],
  ["icon.svg", "icon.svg"],
  ["sw.js", "sw.js"],
  ["qr-poster.html", "qr-poster.html"],
];

for (const [source, target] of files) {
  fs.copyFileSync(path.join(root, source), path.join(dist, target));
}

console.log("Static PWA built in dist/");
