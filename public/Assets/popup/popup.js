/*!
 * rovalra v2.4.10
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
document.addEventListener("DOMContentLoaded", function() {
  const links = {
    "settings-link": "https://www.roblox.com/my/account?rovalra=info#!/info",
    "discord-link": "https://discord.gg/GHd5cSKJRk",
    "donate-link": "https://www.roblox.com/games/store-section/9452973012",
    "github-link": "https://github.com/NotValra/RoValra"
  };
  function addLinkListener(id, url) {
    const element = document.getElementById(id);
    element && element.addEventListener("click", () => chrome.tabs.create({ url }));
  }
  __name(addLinkListener, "addLinkListener");
  for (const id in links)
    addLinkListener(id, links[id]);
});
