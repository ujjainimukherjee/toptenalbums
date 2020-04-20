const express = require('express');
const router = express.Router();
const fs = require('fs');

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
    if (data.albums.total > 2000) {
        data.albums.total = 2000;
    }
    return {
        pageCount: Math.floor(data.albums.total / 30),
        currentPage: 1,
        perPage: 30,
        albums: result,
    };
};

/**
 * format individual album response
 * @param {*} data
 */
const formatAlbumResponse = (data) => {
    return {
        artists: data.artists[0].name,
        href: data.external_urls.spotify,
        imageUrl: data.images[0].url,
        label: data.label,
        name: data.name,
    };
};

/**
 * get data for all albums
 */
router.get('/SearchAllAlbums', async (req, res) => {
    const { spotify } = await require('../utils/spotify');
    const { search, page, limit } = req.query;
    const offset = page === 'undefined' ? 0 : (page - 1) * 30;

    spotify
        .searchAlbums(search, { offset: offset, limit: limit })
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: formatSearchResponse(data.body) }));
            res.end();
        })
        .catch((err) => {
            console.error(err);
            res.statusCode = 400;
        });
});

/**
 * get data for one album only
 */
router.get('/album/:id', async (req, res) => {
    const { spotify } = await require('../utils/spotify');
    spotify
        .getAlbum(req.params.id)
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: formatAlbumResponse(data.body) }));
            res.end();
        })
        .catch((err) => {
            console.error(err);
            res.statusCode = 400;
        });
});

router.get('/toptenalbums', async (req, res) => {
    // read the file & return
    const rawdata = fs.readFileSync('../db/toptenalbums.json');
    let toptenalbums = JSON.parse(rawdata);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({toptenalbums}));
    res.end();
});

router.post('/toptenalbums', async (req, res) => {
   // append to the file & sort the file
   let rawdata = fs.readFileSync('../db/toptenalbums.json');
   let toptenalbums = JSON.parse(rawdata);
   if (toptenalbums.length >= 10) {
       res.status(400).send({message: 'Only ten albums allowed'})
       return
   }

   let anAlbum = req.body
   anAlbum["order"] = toptenalbums.length + 1
   toptenalbums.push(anAlbum)
   console.log(toptenalbums)
   toptenalbums.sort((a, b) => parseInt(a.order) - parseInt(b.order))
   console.log(toptenalbums)

   rawdata = JSON.stringify(toptenalbums, null, 4);
   fs.writeFileSync('../db/toptenalbums.json', rawdata)

   res.status(200).send({message: 'Add Success'})
});

router.delete('/toptenalbums/:id', async (req, res) => {
    //
    const rawdata = fs.readFileSync('../db/toptenalbums.json');
    let toptenalbums = JSON.parse(rawdata);
    if (toptenalbums.length <= 0) {
        res.status(400).send({message: 'Empty top ten list'})
        return
    }

    let filteredAlbums = topTenAlbums.filter((el) => {
        if (el.albumId !== req.params.id) {
            return el;
        }
    });

    // change the order of the rest of the elements
    filteredAlbums.forEach( (el, idx) => {
	      el['order'] = idx + 1
    })

    let rawdata = JSON.stringify(filteredAlbums, null, 4);
    fs.writeFileSync('../db/toptenalbums.json', rawdata)

    res.status(200).send({message: 'Delete Success'})
});

module.exports = router;