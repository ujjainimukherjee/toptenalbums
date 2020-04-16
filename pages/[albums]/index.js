import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { addToTopTenList, orderList, deleteItem } from '../../redux/actions';
import PropTypes from 'prop-types';
import Thumbnail from '../../components/Thumbnail';
import SortableComponent from '../../components/SortableComponent';
import '../../styles.css';

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
        const { toptenList } = this.props;
        const { topTenAlbums } = toptenList;
        const renderAlbums = this.props.albums.data.map((item) => {
            return (
                <li key={item.id}>
                    <Thumbnail
                        imageUrl={item.images[0].url}
                        caption={item.name}
                        artist={item.artist}
                        href={`/albums`}
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

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <SortableComponent
                        data={topTenAlbums}
                        onSortEnd={this.props.orderList}
                        onDelete={this.props.onDelete}
                    />
                </Grid>
                <Grid item xs={6}>
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
        toptenList: state.toptenList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToList: (albumId, albumName, albumArtist, imageSrc) =>
            dispatch(
                addToTopTenList(albumId, albumName, albumArtist, imageSrc)
            ),
        orderList: ({ oldIndex, newIndex }) => {
            dispatch(orderList(oldIndex, newIndex));
        },
        onDelete: (id) => {
            dispatch(deleteItem(id));
        },
    };
};

Albums.propTypes = {
    albums: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
