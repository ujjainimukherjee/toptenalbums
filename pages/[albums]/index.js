import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch'
import Thumbnail from '../../components/Thumbnail';
import PropTypes from 'prop-types';
import "../../styles.css"


class Albums extends Component {

	static async getInitialProps({query}) {
		try {
			const res = await fetch(`http://localhost:3000/api/SearchAllAlbums?search=${ query.searchValue}`)
			const json = await res.json()
			return { albums: json }
	
		} catch (error) {
			return {
				statusCode: error.response ? error.response.status : 500
			};
		}
	}

	render(){

		const renderAlbums = this.props.albums.data.map(item => {
			return (
				<li key={item.id}>
					<Thumbnail
						imageUrl={item.imageSrc}
						caption={item.name}
						artist={item.artist}
						href={`/albums`}
						as={`/albums/${item.id}`}
					/>
					<button className="add__to__list">
						Add to List
					</button>
				</li>
			);
		});

		return (
			<div className="albums__list">
				<header>
					<div className="page__desc">
						<h1>Your Search Results</h1>
					</div>
				</header>			
				<ul className="albums__grid">
					{renderAlbums}
				</ul>
			</div>
		)
	}
}

Albums.propTypes = {
	albums: PropTypes.object
}

export default Albums;