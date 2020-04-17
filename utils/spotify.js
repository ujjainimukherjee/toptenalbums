var SpotifyWebApi = require('spotify-web-api-node');

async function initialize(spotify) {
    const result = await spotify.clientCredentialsGrant()
    spotify.setAccessToken(result.body.access_token)
}

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

module.exports = (async function() {
    console.log("Initializing spotify")
    await initialize(spotify)
    return { spotify }
})();
