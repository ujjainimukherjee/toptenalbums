import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

const AlbumDetails = ({album}) => {
	return (
		<div className="show__details">
			<a href={`${album.data.href}`}>
				<div
					className="show-details__poster"
					style={{ backgroundImage: `url(${album.data.imageUrl})` }}></div>
				
			</a>
			<h1>{album.data.name}</h1>
			<h2>{album.data.label}</h2>
			<p>{album.data.artists}</p>
			<style jsx>{`
				.show-details__poster {
					height: 300px;
					width: 300px;
					background-size: cover;
				}
			`}</style>
		</div>
	);
};

AlbumDetails.getInitialProps = async ({query}) => {
    try {
		const res = await fetch(`http://localhost:3000/api/album/${query.albumId}`)
        const json = await res.json()
        return { album: json }

	} catch (error) {
		return {
			statusCode: error.response ? error.response.status : 500
		};
	}
    
};

AlbumDetails.propTypes = {
	album: PropTypes.object
}

export default AlbumDetails;