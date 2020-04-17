import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { addToTopTenList, orderList, deleteItem } from '../../redux/actions';
import PropTypes from 'prop-types';
import Thumbnail from '../../components/Thumbnail';

class Albums extends Component {
    static async getInitialProps({ query }) {
        try {
            const res = await fetch(
                `http://localhost:3000/api/SearchAllAlbums?search=${query.searchValue}`
            );
            const json = await res.json();
            return { albums: json };
        } catch (error) {
            return {
                statusCode: error.response ? error.response.status : 500,
            };
        }
    }

    render() {
        const renderAlbums = this.props.albums.data.map((item) => {
            return (
                <li key={item.id}>
                    <Thumbnail
                        imageUrl={item.images[0].url}
                        caption={item.name}
                        artist={item.artist}
                        href={`/albums/${item.id}`}
                        as={`/albums/${item.id}`}
                    />
                    <button
                        className="add__to__list"
                        onClick={() =>
                            this.props.addToList(
                                item.id,
                                item.name,
                                item.artist,
                                item.images[1].url
                            )
                        }
                    >
                        Add to List
                    </button>
                </li>
            );
        });
        //TODO: change this to a dialog box
        if (this.props.error) {
            // alert(this.props.error)
        }

        return (
            <Grid className="search__results__wrapper" container spacing={3}>
                <Grid item xs={12}>
                    <div className="albums__list">
                        <header>
                            <div className="page__desc">
                                <h1>Your Search Results</h1>
                            </div>
                        </header>
                        <ul className="albums__grid">{renderAlbums}</ul>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.toptenList.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToList: (albumId, albumName, albumArtist, imageSrc) =>
            dispatch(
                addToTopTenList(albumId, albumName, albumArtist, imageSrc)
            ),
    };
};

Albums.propTypes = {
    albums: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
