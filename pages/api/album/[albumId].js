
function formatResponse(data) {
    return {
        artists: data.artists[0].name,
        href: data.external_urls.spotify,
        imageUrl: data.images[0].url,
        label: data.label,
        name: data.name,
    };
}

export default async (req, res) => {
    const {
        query: { albumId },
    } = req;

    const {spotify} = await require('../../../utils/spotify')

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

};
