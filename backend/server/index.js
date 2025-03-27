const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

const getSpotifyApiCredentials = () => {
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
};

getSpotifyApiCredentials();

setInterval(() => {
  console.log("getting new spotify Api credentials..");
  getSpotifyApiCredentials();
}, 3480000);

// Create random search query
const getRandomSearch = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  return (randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length)
  ));
};

// GET request to Spotify API for a random artists' info
// and web scrape to get their monthly listener count.
const getArtist = async (retries = 5) => {
  if (retries === 0) {
    console.log("Failed to find valid artist after retries.");
    return null;
  }

  const randomOffset = Math.floor(Math.random() * 100);
  const randomLetter = getRandomSearch();

  try {
    const data = await spotifyApi.searchArtists(randomLetter, {
      offset: randomOffset,
      limit: 1,
    });

    const artist = data.body.artists.items[0];
    if (!artist || artist.followers.total < 10000) {
      console.log("Low follower count or no artist found, retrying...");
      return getArtist(retries - 1);
    }

    const listeners = await getArtistListeners(artist.external_urls.spotify);
    if (!listeners) {
      console.log("No listeners found, retrying...");
      return getArtist(retries - 1);
    }

    console.log('"Artist found:", artist.name);');
    return {
      info: artist,
      listeners: listeners,
    };
  } catch (err) {
    console.error("Error fetching artist:", err);
    getSpotifyApiCredentials(); // Refresh token just in case
    return getArtist(retries - 1);
  }
};

const getArtistListeners = async (url) => {
  return await axios.get(url).then(({ data }) => {
    const $ = cheerio.load(data);
    const metaText = $('meta[name="description"]').attr("content");

    var listenerCount = metaText.substring(
      metaText.indexOf("Artist · ") + 9,
      metaText.lastIndexOf(" monthly listeners")
    );

    var cleanListenerCount =
      convertListenersToNumber(listenerCount).toLocaleString();

    return cleanListenerCount;
  });
};

const convertListenersToNumber = (number) => {
  var base = parseFloat(number);
  if (number.toLowerCase().match(/k/)) {
    return Math.round(base * 1000);
  } else if (number.toLowerCase().match(/m/)) {
    return Math.round(base * 1000000);
  } else if (number.toLowerCase().match(/b/)) {
    return Math.round(base * 1000000000);
  }
};

app.get("/getArtists", async (req, res) => {
  console.log("/getArtists was hit");
  let artists = [];
  let attempts = 0;
  const maxAttempts = 10;

  while (artists.length < 2 && attempts < maxAttempts) {
    const artist = await getArtist();
    if (artist) {
      artists.push(artist);
    }
    attempts++;
  }

  if (artists.length < 2) {
    return res
      .status(500)
      .json({ error: "Could not fetch enough valid artists." });
  }

  res.status(200).send(artists);
});

app.get("/getArtist", async (req, res) => {
  console.log("/getArtist was hit");
  const artist = await getArtist();
  if (!artist) {
    return res.status(404).json({ error: "No suitable artist found." });
  }
  res.status(200).send(artist);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
