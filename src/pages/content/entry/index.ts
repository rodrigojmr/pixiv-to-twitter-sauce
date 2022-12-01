import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { makeButton } from "./components";

refreshOnUpdate("pages/content/index");

chrome.runtime.onMessage.addListener(function (request) {
  if (request === "pixiv artwork page") {
    makeButton();
  }
});
