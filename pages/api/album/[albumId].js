const Spotify = require('node-spotify-api');

function formatResponse(data) {
    return {
        artists: data.artists[0].name,
        href: data.external_urls.spotify,
        imageUrl: data.images[0].url,
        label: data.label,
        name: data.name,
    };
}

export default (req, res) => {
    const {
        query: { albumId },
    } = req;

    const spotify = new Spotify({
        id: process.env.SPOTIFY_CLIENT_ID,
        secret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    spotify
        .request(`https://api.spotify.com/v1/albums/${albumId}`)
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: formatResponse(data) }));
            res.end();
        })
        .catch((err) => {
            console.error('Error occurred: ' + err);
        });
};
