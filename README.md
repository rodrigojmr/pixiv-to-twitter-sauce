# Pixiv to Twitter (Sauce)

While Pixiv is great, it doesn't have the social share factor as Twitter does. If I find an artwork I like on Pixiv, I want to share it on Twitter as well, ideally from the artist's account.

This Chrome extensions allows you to quickly find if an artist has also posted their artwork on Twitter, and opens those tweets in a new tab. You can then easily like or retweet them!

#### Limitations

As this extension uses on SauceNAO's search, and SauceNAO is in turn dependant on users uploading and tagging sources on Booru sites, it is likely it will not find a source on new artwork that has not been posted on Booru with the source being Twitter. This is just an easy shortcut that might save time in most cases.

## Setup

This extension uses SauceNAO to discover if there's an existing tweet with the first image of a pixiv post. Due to limitations on SaucenNAO's free API (6 per 30s and 200 every 24h), I cannot reuse my key in case more people use this extension, and so you must set up your own SauceNAO key.

Once installed, a simple options page will appear with the link to [create a SauceNAO account](https://saucenao.com/user.php) and an input to insert your API key.

## Demo

![](https://j.gifs.com/BNwqvN.gif)

## Instalation

- Download Pixiv2Twitter.zip from the releases page.
- Extract this zip file in a convenient folder.
- Open chrome://extensions in a new tab.
- Enable "Developer mode" at the top-right.
- Click the "Load unpacked" button that just appeared.
- Select the folder where you just extracted the zip.

## Planned

- Submit to Chrome Web Store
- If several tweets are found, show a preview of all tweets so you can choose which one you wanna open.
- This was created in a day so there's some possible housekeeping and testing to be done.
