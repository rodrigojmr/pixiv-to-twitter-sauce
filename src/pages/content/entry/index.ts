import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { makeButton } from "./components";

refreshOnUpdate("pages/content/index");

// const root = document.createElement("div");
// root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
// document.body.append(root);

// createRoot(root).render(<App />);

chrome.runtime.onMessage.addListener(function (request) {
  if (request === "pixiv artwork page") {
    makeButton();
  }
});
