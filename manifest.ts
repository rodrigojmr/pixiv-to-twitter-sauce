import packageJson from "./package.json";

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.js" },
  permissions: ["scripting", "storage", "tabs"],
  action: {
    default_icon: "pixiv-twitter-icon.png",
  },
  icons: {
    "128": "pixiv-twitter-icon.png",
  },
  host_permissions: ["https://*.pixiv.net/*", "https://*.twitter.com/*"],
  content_scripts: [
    {
      matches: ["https://*.pixiv.net/*"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "pixiv-twitter-icon.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
