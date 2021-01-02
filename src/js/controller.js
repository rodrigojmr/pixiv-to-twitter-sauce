import { createThumbnails, logoHTML } from './content_main.js';
import { fetchSauceNAO } from './api.js';

export const handleFetch = async function (e) {
  e.preventDefault();
  e.target.innerHTML = '<img src="https://i.imgur.com/4LBBzRr.gif">';

  const artURL = document.querySelector('main section figure img').src;

  try {
    const results = await fetchSauceNAO(artURL);
    console.log({ results });
    const resultsWithTwitter = parseForTwitterURLs(results);

    if (resultsWithTwitter.length > 0) e.target.innerHTML = logoHTML;

    if (resultsWithTwitter.length === 1) {
      sendMessagePromise({
        message: 'found-tweet',
        url: resultsWithTwitter[0].source
      });
    } else if (resultsWithTwitter.length > 1) {
      sendMessagePromise({
        message: 'found-tweets',
        urls: resultsWithTwitter.map(tweet => tweet.source)
      });
      createThumbnails(resultsWithTwitter);
    } else {
      e.target.innerHTML = 'No tweets found.';
    }
  } catch (error) {
    e.target.innerHTML = 'Twitter';
    console.log('error: ', error);
    if (error.message === 'api-not-found') {
      alert(`Set up your SauceNAO API.`);
      chrome.runtime.sendMessage({ message: 'openOptionsPage' });
    }
  }
};

const parseForTwitterURLs = results => {
  // debugger;
  const withTwitterSources = results
    .filter(result => {
      const booruTwitterSource =
        result.data.source && result.data.source.includes('twitter');
      const fromTwitter = result.header.index_id === 41;
      return (
        result.header.similarity > 80 && (booruTwitterSource || fromTwitter)
      );
    })
    .map(result => {
      const fromTwitter = result.header.index_id === 41;
      const twitterSource = result.data.ext_urls[0];
      return {
        ...result.data,
        source: fromTwitter ? twitterSource : result.data.source,
        thumbnail: result.header.thumbnail
      };
    });

  const uniqueResults = withTwitterSources.filter((result, pos, arr) => {
    const allUrls = arr.map(mapObj => mapObj.source);
    const isFirstInstanceOfUrl = allUrls.indexOf(result.source) === pos;
    return isFirstInstanceOfUrl;
  });

  return uniqueResults;
};

export const sendMessagePromise = req => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(req, res => {
      if (res) {
        resolve(res);
      } else {
        if (req.message === 'api') reject('api-not-found');
        reject('Something wrong');
      }
    });
  });
};
