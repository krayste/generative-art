# generative-art
![sample-1](/Users/Steve/Desktop/Extracurricular/Learning/Generator/generative-art/samples/sample-1.png)

![sample-2](/Users/Steve/Desktop/Extracurricular/Learning/Generator/generative-art/samples/sample-2.png)

![sample-3](/Users/Steve/Desktop/Extracurricular/Learning/Generator/generative-art/samples/sample-3.png)

This repo serves both a static github page that produces generative art, and a node script that screenshots and uploads it as my Twitter banner hourly via a cron job on my home server. The code for this repo is majorly sourced from [this tutorial](https://github.com/sdedovic/noiseorbit-tutorial) and I simply changed the frameCount starting point and the dimensions to fit the 1500 x 500px twitter banner size. The art is generated and served at [https://krayste.github.io/generative-art/](https://krayste.github.io/generative-art/), which you may visit and refresh to grab a newly generated image each time.

## Dependencies

This project uses dotenv to manage environmental variables, [puppeteer](https://github.com/puppeteer/puppeteer) to access and screenshot the github page that serves the generated art, and [twitter-api-client](https://www.npmjs.com/package/twitter-api-client) to interact with the twitter API and upload banner photos.

## How to use

### Twitter Developer Account and .env

You need to obtain a twitter developer account to access the API keys needed for `twitter-api-client`. Note that you need to enable OAuth 1.0a and set the app permissions to "Read and write" before regenerating the keys, otherwise you will encounter authorization errors. Place these keys in `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_TOKEN_SECRET`.

### Serving the site 

The site can be served through github pages by setting the source as the `/root`. 

### Running the script

After running `npm install` to install the depencies, you may run `npm banner` or `node index.js` to run the script and update your twitter banner photo. You may automate this by adding a line to your crontab (run `crontab -e` and set nano as the text editor), but note that you need to use absolute paths from `/home` for both the location of `node` (you can use `whereis node` to find this) and to the location of `index.js`. Eg, to run hourly, one can add the line:

```
0 * * * * /usr/local/bin/node /home/pi/art-generation/index.js
```

