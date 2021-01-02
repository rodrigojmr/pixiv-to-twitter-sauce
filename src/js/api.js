import { sendMessagePromise } from './controller.js';

export const fetchSauceNAO = async function (artURL) {
  try {
    const API = await sendMessagePromise({ message: 'api' });

    const url = new URL(
      'https://cors-anywhere.herokuapp.com/https://saucenao.com/search.php'
    );
    const params = {
      output_type: 2,
      api_key: API,
      db: 999,
      dedupe: 1,
      numres: 10,
      url: artURL
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      'Content-Type': 'application/json'
    });

    const { results } = await response.json();
    return results;
  } catch (error) {
    throw new Error(error);
  }
};
