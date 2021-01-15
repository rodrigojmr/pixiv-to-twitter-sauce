import { sendMessagePromise } from './controller.js';

export const fetchSauceNAO = async function (artURL) {
  try {
    const API = await sendMessagePromise({ message: 'api' });

    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://saucenao.com/search.php?output_type=2&api_key=${API}&db=999&url=${artURL}`
    )}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res = await response.json();
    const contents = JSON.parse(res.contents);
    return contents.results;
  } catch (error) {
    throw new Error(error);
  }
};
