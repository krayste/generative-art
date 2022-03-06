const puppeteer = require("puppeteer"); // Require Puppeteer module
const client = require("twitter-api-client");
require("dotenv").config();

// Create a new twitter client
const twitterClient = new client.TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_TOKEN_SECRET,
});

// URL to screenshot
const url = "https://krayste.github.io/generative-art/";

async function updateBanner() {
  // Launch puppeteer browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Twitter banner size is 1500 x 500 px
  await page.setViewport({
    width: 1500,
    height: 500,
  });

  // Ensures the page is completely loaded before taking a screenshot
  await page.goto(url, { waitUntil: "networkidle0" });
  const base64 = await page.screenshot({
    // Base 64 encoding for the twitter client
    encoding: "base64",
    fullPage: true,
  });

  // Close both the page and browser
  await page.close();
  await browser.close();

  // Upload the banner to twitter
  await twitterClient.accountsAndUsers
    .accountUpdateProfileBanner({
      banner: base64,
    })
    .then(() => {
      console.log("Banner updated successfully ✨");
    })
    .catch((err) => {
      console.log(err);
    });
}

updateBanner();
