//const Spotify = require('node-spotify-api');
var SpotifyWebApi = require('spotify-web-api-node');
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

async function getToken (spotify) {
    const result = await spotify.clientCredentialsGrant()
    return result.body.access_token
}

async function initialize(spotify) {
    const tok = await getToken(spotify)
    spotify.setAccessToken(tok)
}

async function searchAlbums(spotify, searchStr, offset, res) {
      await initialize(spotify)
      spotify.searchAlbums(searchStr, {offset:offset, limit:30})
  .then(function(data) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ data:formatResponse(data.body)}))
  }, function(err) {
      console.error(err);
      res.statusCode = 400
  });
}

export default (req, res) => {
  /*const spotify = new Spotify({
    id: '467b0f6214aa48f9ab185396b7888ddf',
    secret: '003823169c5c46fa9d18b1bd9b01a309'
  });*/
  const spotify = new SpotifyWebApi({
    clientId: '467b0f6214aa48f9ab185396b7888ddf',
    clientSecret: '003823169c5c46fa9d18b1bd9b01a309'
  });

  searchAlbums(spotify, req.query.search, 0, res)
  
  /*spotify
    .search({ type: 'album', query: req.query.search })
    .then (response => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ data:formatResponse(response)}))
    }).catch(err => {
      console.log(err);
    })*/
}
