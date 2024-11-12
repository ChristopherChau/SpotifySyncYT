// const express = require("express");
// const spotifyApi = require("../config/spotifyConfig/spotifyConfig");
// const getMyData = require("../services/spotifyService");
// const { getPlaylistAndTracks } = require("../../setPlaylistInfo");
// const { downloadPlaylist } = require("../services/youtubeService");
// const ytAuth = require("../config/youtubeAuthConfig/youtubeToken");
// const getOwnPlaylists = require("../config/youtubeAuthConfig/youtubeConfig");
// const auth = require("../config/spotifyConfig/spotifyToken");

// const router = express.Router();

// const scopes = [
//   "ugc-image-upload",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "user-read-currently-playing",
//   "streaming",
//   "app-remote-control",
//   "user-read-email",
//   "user-read-private",
//   "playlist-read-collaborative",
//   "playlist-modify-public",
//   "playlist-read-private",
//   "playlist-modify-private",
//   "user-library-modify",
//   "user-library-read",
//   "user-top-read",
//   "user-read-playback-position",
//   "user-read-recently-played",
//   "user-follow-read",
//   "user-follow-modify",
// ];

// let accessToken = "";

// router.get("/login", (req, res) => {
//   res.redirect(spotifyApi.createAuthorizeURL(scopes));
// });

// router.get("/callback", (req, res) => {
//   const error = req.query.error;
//   const code = req.query.code;

//   if (error) {
//     console.error("Callback Error:", error);
//     res.send(`Callback Error: ${error}`);
//     return;
//   }

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       accessToken = data.body["access_token"];
//       const refreshToken = data.body["refresh_token"];
//       const expiresIn = data.body["expires_in"];

//       spotifyApi.setAccessToken(accessToken);
//       spotifyApi.setRefreshToken(refreshToken);
//       console.log(accessToken);

//       auth.spotifyGetToken(accessToken);

//       res.send("Successful");

//       setInterval(async () => {
//         const data = await spotifyApi.refreshAccessToken();
//         const accessTokenAgain = data.body["access_token"];
//         console.log(`Access token refreshed: ${accessTokenAgain}`);
//         spotifyApi.setAccessToken(accessTokenAgain);
//       }, (expiresIn / 2) * 1000);

//       getMyData();
//     })
//     .catch((err) => {
//       console.error(`Error getting tokens: ${err}`);
//       res.send(`Error getting tokens: ${err}\n`);
//     });
// });

// router.get("/getPlaylists", (req, res) => {
//   if (!accessToken) {
//     console.log("no token");
//     res.send("no token");
//   } else {
//     console.log("in playlist");
//     res.send("Successful");
//     getPlaylistAndTracks();
//   }
// });

// router.get("/downloadSongs", async (req, res) => {
//   let response = await getOwnPlaylists(ytAuth.getToken());
//   for (let playlistName of response.items) {
//     if (playlistName.snippet.title === "Kp") {
//       let path = `./${playlistName.snippet.title}`;
//       let playlistURL = `https://www.youtube.com/playlist?list=${playlistName.id}`;
//       downloadPlaylist(path, playlistURL);
//     }
//   }
// });

// module.exports = router;

// route.js
const express = require("express");
const spotifyApi = require("../config/spotifyConfig/spotifyConfig");
const getMyData = require("../services/spotifyService");
const { getPlaylistAndTracks } = require("../../setPlaylistInfo");
const { downloadPlaylist } = require("../../SpotYTFuncs/download");
// const { downloadPlaylist } = require("../utils/utils")
const ytAuth = require("../config/youtubeAuthConfig/youtubeToken");
const getOwnPlaylists = require("../config/youtubeAuthConfig/youtubeConfig");
const auth = require("../config/spotifyConfig/spotifyToken");

const router = express.Router();

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

router.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

router.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      auth.spotifySetToken(accessToken);

      res.send("Successful");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessTokenAgain = data.body["access_token"];
        spotifyApi.setAccessToken(accessTokenAgain);
      }, (expiresIn / 2) * 1000);

      getMyData();
    })
    .catch((err) => {
      console.error(`Error getting tokens: ${err}`);
      res.send(`Error getting tokens: ${err}\n`);
    });
});

router.get("/getPlaylists", (req, res) => {
  const accessToken = ytAuth.youtubeGetToken();
  if (!accessToken) {
    console.log("No token available");
    res.send("No token available");
  } else {
    console.log("In playlist");
    res.send("Successful");
    getPlaylistAndTracks();
  }
});

module.exports = router;