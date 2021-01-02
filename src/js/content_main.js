import { handleFetch } from './controller.js';

export const main = () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request === 'pixiv artwork page') {
      makeButton();
    }
  });
};

export const logoHTML = `<img src=${chrome.extension.getURL(
  'src/assets/twitter-white-logo.png'
)} alt="Pixiv to Twitter" style="width:20px;"">`;

export const makeButton = () => {
  if (!document.querySelector('#twitter-share')) {
    const section = document.querySelector('main section section');
    const likeButton = document.querySelector('.gtm-main-bookmark').parentNode
      .nextSibling;

    let div = document.createElement('div');
    div.className = 'sc-181ts2x-3 iujCSd';

    let button = document.createElement('button');
    button.setAttribute('id', 'twitter-share');
    button.addEventListener('click', handleFetch);
    button.innerHTML = logoHTML;
    // let t = document.createTextNode('Twitter');

    div.appendChild(button);
    // button.appendChild(t);
    insertAfter(likeButton, div);
  }
};

const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const createThumbnails = function (results) {
  //TODO Create DOM components for 2 or more results
};
