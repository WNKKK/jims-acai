import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "jims-acai-customer.html");

let html = fs.readFileSync(htmlPath, "utf8");

const replacements = new Map([
  ["Ã°Å¸Â«Â", "Acai"],
  ["ðŸ«", "Acai"],
  ["Ã°Å¸â€œÂ²", "Phone"],
  ["ðŸ“²", "Phone"],
  ["Ã°Å¸Å½Â", "Gift"],
  ["ðŸŽ", "Gift"],
  ["Ã°Å¸Å½â€°", ""],
  ["ðŸŽ‰", ""],
  ["Ã¢Å“â€œ", "✓"],
  ["âœ“", "✓"],
  ["Ã¢Å“â€¦", "Done"],
  ["âœ…", "Done"],
  ["Ã¢â€ â€™", "->"],
  ["â†’", "->"],
  ["Ã¢â‚¬â€", "-"],
  ["â€”", "-"],
  ["Ã¢â‚¬Âº", ">"],
  ["â€º", ">"],
  ["Ã¢â‚¬Â¹", "<"],
  ["â€¹", "<"],
  ["Ã¢Â¬â€º", "Scan"],
  ["â¬›", "Scan"],
  ["Ã¢Ëœâ‚¬", "Sun"],
  ["â˜€", "Sun"],
  ["Ã°Å¸Â", "Home"],
  ["ðŸ", "Home"],
  ["Ã°Å¸â€˜Â¤", "Profile"],
  ["ðŸ‘¤", "Profile"],
  ["Ã°Å¸ÂÅ½", "iOS"],
  ["ðŸŽ", "iOS"],
  ["Ã°Å¸Â¤â€“", "Android"],
  ["ðŸ¤–", "Android"],
  ["Ã°Å¸â€œÂ¤", "Share"],
  ["ðŸ“¤", "Share"],
  ["Ã¢Å¾â€¢", "+"],
  ["âž•", "+"],
  ["Ã¢â€¹Â®", "Menu"],
  ["â‹®", "Menu"],
  ["1Ã¯Â¸ÂÃ¢Æ’Â£", "1"],
  ["1ï¸âƒ£", "1"],
  ["Ã‚Â·", "·"],
  ["Â·", "·"],
]);

for (const [bad, good] of replacements) {
  html = html.split(bad).join(good);
}

// Remove corrupted decorative comment text; it is not user-facing and makes the file fragile.
html = html.replace(/\/\*\s*[Ãâ][\s\S]*?(SPLASH|ONBOARDING|REGISTER|RENDER HOME|RENDER BARCODE|RENDER PROFILE|MODALS|INSTALL PROMPT \(Android Chrome native\)|BRIGHTNESS|CONFETTI|SIGN OUT \/ EDIT|UTILS)[\s\S]*?\*\//g, "/* $1 */");
html = html.replace(/<!--\s*[Ãâ][\s\S]*?(SPLASH|ONBOARDING|REGISTER|HOME|BARCODE|PROFILE|INSTALL MODAL|REWARD MODAL)[\s\S]*?-->/g, "<!-- $1 -->");

// Make startup resilient if a stale browser cache or script error interrupts initialization.
if (!html.includes("window.addEventListener('error', function(event)")) {
  html = html.replace(
    "<script>\n/*",
    `<script>
window.addEventListener('error', function(event){
  console.error('Jim\\'s Acai app error:', event.error || event.message);
  var splash = document.getElementById('sc-splash');
  var onboard = document.getElementById('sc-onboard');
  if (splash && splash.classList.contains('active') && onboard) {
    setTimeout(function(){
      if (splash.classList.contains('active')) show('onboard');
    }, 2200);
  }
});
/*`
  );
}

fs.writeFileSync(htmlPath, html, "utf8");
console.log("Customer HTML repaired.");
