
/**
 * formatting data for use by UI
 * @param {*} data
 */
function formatResponse(data){
    let result = []
    const items = data.albums.items;
    items.forEach(el => {
      const album = {
        artist: el.artists[0].name,
        tracks: el.total_tracks,
        id: el.id,
        images: [el.images[1], el.images[2]],
        name: el.name,
        link: el.href
      }
      result.push(album)
    })
  return result
}

export default async (req, res) => {
    const {spotify} = await require('../../utils/spotify');

    spotify.searchAlbums(req.query.search, {offset:0, limit:30})
    .then(function(data) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data:formatResponse(data.body)}))
        res.end()
    }, function(err) {
        console.error(err);
        res.statusCode = 400
    });
}
