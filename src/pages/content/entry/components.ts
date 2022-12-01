import { fetchSauces } from "./api";
import logo from "@assets/img/twitter-white-logo.png";

export const logoHTML = `<img src=${logo} alt="Pixiv to Twitter" style="width:20px;"">`;

export const makeButton = () => {
  if (!document.querySelector("#twitter-share")) {
    const section = document.querySelector("main section section");
    const buttons = section.querySelectorAll("[type=button]");
    const lasButtonContainer = buttons[buttons.length - 1].parentNode;

    const div = document.createElement("div");
    div.className = "sc-181ts2x-3 iujCSd";
    div.setAttribute("id", "twitter-share-wrapper");
    div.setAttribute(
      "style",
      "display: flex; padding-left: 10px; padding-right: 10px;"
    );

    const button = document.createElement("button");
    button.setAttribute("id", "twitter-share");
    button.addEventListener("click", fetchSauces);
    button.innerHTML = logoHTML;

    div.appendChild(button);
    insertBefore(lasButtonContainer, div);
  }
};

const insertBefore = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const resetButton = () => {
  const button = document.querySelector<HTMLButtonElement>("#twitter-share");
  if (button) {
    button.innerHTML = logoHTML;
  }
};

export const setButtonHTML = (html: string) => {
  const button = document.querySelector<HTMLButtonElement>("#twitter-share");
  if (button) {
    button.innerHTML = html;
  }
};

export const createThumbnails = function (results) {
  //TODO Create DOM components for 2 or more results
};
