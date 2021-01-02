chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes('artworks')) {
    chrome.tabs.sendMessage(tabId, 'pixiv artwork page');
  }
});

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  switch (req.message) {
    case 'api':
      getLocalStorageValue('saucenaoAPI').then(sendResponse);
      return true;
    case 'found-tweet':
      chrome.tabs.create({ url: req.url });
      return true;
    case 'found-tweets':
      req.urls.forEach(url => {
        chrome.tabs.create({ url });
      });
      break;
    case 'openOptionsPage':
      chrome.runtime.openOptionsPage();
      break;
    default:
      break;
  }
});

async function getLocalStorageValue(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}
