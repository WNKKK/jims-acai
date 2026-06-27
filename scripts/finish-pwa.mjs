import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "jims-acai-customer.html");

let html = fs.readFileSync(htmlPath, "utf8");
const manifest = '<link rel="manifest" href="manifest.webmanifest"/>';

if (!html.includes("icon.svg")) {
  html = html.replace(
    manifest,
    `${manifest}
<link rel="icon" href="icon.svg" type="image/svg+xml"/>
<link rel="apple-touch-icon" href="icon.svg"/>`
  );
}

fs.writeFileSync(htmlPath, html, "utf8");
console.log("PWA HTML update complete.");
