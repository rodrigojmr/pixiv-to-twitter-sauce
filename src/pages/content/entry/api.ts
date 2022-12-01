import { fetcher } from "itty-fetcher";
import { setButtonHTML, resetButton } from "./components.js";
import { SauceNAOResponse, SauceNAOResult } from "./types.js";

const baseFetcher = fetcher();

type Response = {
  contents: string;
  status: {
    url: string;
    content_type: "application/json";
    content_length: number;
    http_code: number;
    response_time: number;
  };
};

export async function fetchSauceNAO(artURL: string) {
  try {
    const API = await sendMessagePromise<string>({ message: "api" });

    const res = await baseFetcher.get<Response>(
      "https://api.allorigins.win/get",
      {
        url: `https://saucenao.com/search.php?output_type=2&api_key=${API}&db=999&url=${artURL}`,
      }
    );
    const contents: SauceNAOResponse = await JSON.parse(res.contents);
    if (contents.header.status === -1) {
      throw new Error("invalid-api");
    }
    return contents;
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchSauces = async function (e: MouseEvent) {
  e.preventDefault();
  setButtonHTML('<img src="https://i.imgur.com/4LBBzRr.gif">');

  const artURL = document.querySelector<HTMLImageElement>(
    "main section figure img"
  ).src;

  try {
    const { results } = await fetchSauceNAO(artURL);
    const resultsWithTwitter = parseForTwitterURLs(results);
    if (resultsWithTwitter.length > 0) {
      sendMessagePromise({
        message: "found-tweets",
        urls: resultsWithTwitter.map((tweet) => tweet.source),
      });
      resetButton();
    } else {
      setButtonHTML("No tweets found.");
    }
  } catch (error) {
    resetButton();
    if (error instanceof Error) {
      const invalidAPIError = ["api-not-found", "invalid-api"].some((message) =>
        error.message.includes(message)
      );
      if (invalidAPIError) {
        alert(`Set up your SauceNAO API.`);
        chrome.runtime.sendMessage({ message: "openOptionsPage" });
      }
    }
  }
};

const parseForTwitterURLs = (results: SauceNAOResult[]) => {
  const withTwitterSources = results
    .filter((result) => {
      const hasTwitterUrl =
        result.data.source?.includes("twitter") ||
        result.data.ext_urls.some((url) => url.includes("twitter"));
      return Number(result.header.similarity) > 80 && hasTwitterUrl;
    })
    .map((result) => {
      return {
        ...result.data,
        source: result.data.source?.includes("twitter")
          ? result.data.source
          : result.data.ext_urls.find((url) => url.includes("twitter")),
        thumbnail: result.header.thumbnail,
      };
    });

  const uniqueResults = withTwitterSources.filter((result, pos, arr) => {
    const allUrls = arr.map((mapObj) => mapObj.source);
    const isFirstInstanceOfUrl = allUrls.indexOf(result.source) === pos;
    return isFirstInstanceOfUrl;
  });

  return uniqueResults;
};

export const sendMessagePromise = <T>(req) => {
  return new Promise<T>((resolve, reject) => {
    chrome.runtime.sendMessage(req, (res) => {
      if (res) {
        resolve(res);
      } else {
        if (req.message === "api") {
          reject("api-not-found");
        }
        reject("Something wrong");
      }
    });
  });
};
