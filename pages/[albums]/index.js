import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch'
import { connect } from 'react-redux';
import { addToTopTenList } from '../../redux/actions';
import PropTypes from 'prop-types';
import Thumbnail from '../../components/Thumbnail';
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
					<button className="add__to__list" onClick={() => this.props.addToList(item.id, item.name, item.artist, item.imageSrc)}>
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

const mapStateToProps = state => {
	console.log('this state is ', state)
    return {
        toptenList: state.toptenList
    }
};

const mapDispatchToProps = dispatch => {
	return {
		addToList: (albumId, albumName, albumArtist, imageSrc) => dispatch(addToTopTenList(albumId, albumName, albumArtist, imageSrc))
	}
}

Albums.propTypes = {
	albums: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);