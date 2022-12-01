import { fetchSauces } from "./api";
import logo from "@assets/img/twitter-white-logo.png";

export const logoHTML = `<img src=${logo} alt="Pixiv to Twitter" style="width:20px;"">`;

export const makeButton = () => {
  if (!document.querySelector("#twitter-share")) {
    const section = document.querySelector("main section section");
    const buttons = section.querySelectorAll("[type=button]");
    const lasButtonContainer = buttons[buttons.length - 1].parentElement;

    const wrapper = document.createElement("div");
    wrapper.className = lasButtonContainer.className;
    wrapper.setAttribute("id", "twitter-share-wrapper");
    wrapper.setAttribute("style", "display: flex;");

    const button = document.createElement("button");
    button.setAttribute("id", "twitter-share");
    button.addEventListener("click", fetchSauces);
    button.innerHTML = logoHTML;

    wrapper.appendChild(button);
    insertBefore(lasButtonContainer, wrapper);
  }
};

const insertBefore = (referenceNode, newNode) => {
  referenceNode.parentElement.insertBefore(newNode, referenceNode.nextSibling);
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
