//const Spotify = require('node-spotify-api');
var SpotifyWebApi = require('spotify-web-api-node');

function formatResponse(data) {
    return {
        artists: data.artists[0].name,
        href: data.external_urls.spotify,
        imageUrl: data.images[0].url,
        label: data.label,
        name: data.name,
    };
}

async function getToken (spotify) {
    const result = await spotify.clientCredentialsGrant()
    return result.body.access_token
}

async function initialize(spotify) {
    const tok = await getToken(spotify)
    spotify.setAccessToken(tok)
}

async function getAlbum(spotify, albumId, res) {
    await initialize(spotify)
    spotify.getAlbum(albumId).then(function(data) {
        console.log(data)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data:formatResponse(data.body)}))
        res.end();
    }, function(err) {
        console.error(err);
        res.statusCode = 400
    });
}

export default (req, res) => {
    const {
        query: { albumId },
    } = req;

    /*const spotify = new Spotify({
        id: '467b0f6214aa48f9ab185396b7888ddf',
        secret: '003823169c5c46fa9d18b1bd9b01a309',
    });*/

    const spotify = new SpotifyWebApi({
      clientId: '467b0f6214aa48f9ab185396b7888ddf',
      clientSecret: '003823169c5c46fa9d18b1bd9b01a309'
    });

    getAlbum(spotify, albumId, res)

    /*spotify
        .request(`https://api.spotify.com/v1/albums/${albumId}`)
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: formatResponse(data) }));
            res.end();
        })
        .catch((err) => {
            console.error('Error occurred: ' + err);
        });*/
};
