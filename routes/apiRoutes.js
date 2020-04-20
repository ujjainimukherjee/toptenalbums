const express = require('express');
const router = express.Router();

/**
 * formatting search all albums data for use by UI
 * @param {*} data
 */
const formatSearchResponse = (data) => {
    let result = [];
    const items = data.albums.items;
    items.forEach((el) => {
        const album = {
            artist: el.artists[0].name,
            tracks: el.total_tracks,
            id: el.id,
            images: [el.images[1], el.images[2]],
            name: el.name,
            link: el.href,
        };
        result.push(album);
    });
    return {
        totalCount: data.albums.total,
        pageCount: Math.floor(data.albums.total/30),
        currentPage: 1,
        perPage: 30,
        albums: result

    };
};

/**
 * format individual album response
 * @param {*} data 
 */
const  formatAlbumResponse = data => {
    return {
        artists: data.artists[0].name,
        href: data.external_urls.spotify,
        imageUrl: data.images[0].url,
        label: data.label,
        name: data.name,
    };
}

/**
 * get data for all albums
 */
router.get('/SearchAllAlbums', async (req, res) => {
    const { spotify } = await require('../utils/spotify');
    const { search, page, limit } = req.query;
    const offset = page === 'undefined' ? 30 : page * 30;
    spotify
        .searchAlbums(search, { offset: offset, limit: limit })
        .then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: formatSearchResponse(data.body) }));
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.statusCode = 400;
        });
});


/**
 * get data for one album only
 */
router.get('/album/:id', async (req, res) => {
    const { spotify } = await require('../utils/spotify');
    spotify.getAlbum(req.params.id).then( data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: formatAlbumResponse(data.body) }));
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.statusCode = 400;
        });
});

module.exports = router;
