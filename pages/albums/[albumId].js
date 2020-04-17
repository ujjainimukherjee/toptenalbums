import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Grid from '@material-ui/core/Grid';

const AlbumDetails = ({ album }) => {
    return (
        <div id="main" className="album__details__wrapper">
            <Grid container justify="center">
                <div className="show__details">
                    <a href={`${album.data.href}`}>
                        <div
                            className="show-details__poster"
                            style={{
                                backgroundImage: `url(${album.data.imageUrl})`,
                            }}
                        ></div>
                    </a>
                    <div className="desc__wrapper">
                        <h2>{album.data.name}</h2>
                        <p>{album.data.artists}</p>
                        <a id="play__button" href={`${album.data.href}`}>
                            Play
                        </a>
                    </div>
                    <style jsx>{`
                        .show-details__poster {
                            height: 300px;
                            width: 300px;
                            background-size: cover;
                        }
                    `}</style>
                </div>
            </Grid>
        </div>
    );
};

AlbumDetails.getInitialProps = async ({ query }) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/album/${query.albumId}`
        );
        const json = await res.json();
        return { album: json };
    } catch (error) {
        return {
            statusCode: error.response ? error.response.status : 500,
        };
    }
};

AlbumDetails.propTypes = {
    album: PropTypes.object,
};

export default AlbumDetails;
