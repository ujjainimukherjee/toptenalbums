var SpotifyWebApi = require('spotify-web-api-node');
const NodeCache = require('node-cache');
var myCache = new NodeCache();

async function initialize(spotify) {
    let accessToken = myCache.get('spotifyAccessToken');
    if (accessToken === undefined) {
        const result = await spotify.clientCredentialsGrant();
        accessToken = result.body.access_token;
        console.log('Access token granted ', accessToken);
        myCache.set('spotifyAccessToken', accessToken, 50 * 60);
    }
    spotify.setAccessToken(accessToken);
}

const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

module.exports = (async function () {
    console.log('Initializing spotify');
    try {
        await initialize(spotify);
    } catch(err){
        console.log('Spotify initialize error ', err)
    }
    return { spotify };
})();
