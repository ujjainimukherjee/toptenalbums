const express = require('express');
const router = express.Router();

//const request = require('superagent');
//const async = require('async');

router.get('/test', (req, res) => {
    res.status(200).json({test: 'ok'});
});

function formatSearchResponse(data){
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

router.get('/SearchAllAlbums', async (req, res) => {
    const {spotify} = await require('../utils/spotify');

    console.log('access token for search', spotify.getAccessToken())
    spotify.searchAlbums(req.query.search, {offset:0, limit:30})
    .then(function(data) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data:formatSearchResponse(data.body)}))
        res.end()
    }, function(err) {
        console.error(err);
        res.statusCode = 400
    });
});

function formatAlbumResponse(data) {
    return {
        artists: data.artists[0].name,
        href: data.external_urls.spotify,
        imageUrl: data.images[0].url,
        label: data.label,
        name: data.name,
    };
}

router.get('/album/:id', async (req, res) => {

    const {spotify} = await require('../utils/spotify')

    //console.log('album id ', req.params.id)
    //console.log('access token for album', spotify.getAccessToken())

    spotify.getAlbum(req.params.id).then(function(data) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data:formatAlbumResponse(data.body)}))
        res.end();
    }, function(err) {
        console.error(err);
        res.statusCode = 400
    });

});

module.exports = router;
