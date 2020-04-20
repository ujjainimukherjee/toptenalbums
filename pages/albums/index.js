/**
 * Notes: URLSearchParams will not work in IE
 * Polyfill https://www.npmjs.com/package/url-search-params-polyfill
 * may be used
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import Router from 'next/router';
import Grid from '@material-ui/core/Grid';
import ReactPaginate from 'react-paginate';
import { addToTopTenList } from '../../redux/actions';
import Thumbnail from '../../components/Thumbnail';
import './albums.css';

class Albums extends Component {
    static async getInitialProps({ query, pathname }) {
        const { searchValue } = query;
        const page = query.page || 1;
        try {
            const API = 'http://localhost:3000/api/SearchAllAlbums?';
            let url =
                API +
                new URLSearchParams({
                    search: searchValue,
                    page,
                    limit: 30,
                });
            const res = await fetch(url);
            const json = await res.json();
            return {
                albums: json.data.albums,
                offset: json.data.offset,
                total: json.data.total,
                query,
                pathname,
            };
        } catch (error) {
            return {
                statusCode: error.response ? error.response.status : 500,
            };
        }
    }

    paginationHandler = (page) => {
        const currentQuery = this.props.query;
        const pageSelected = isNaN(page.selected) ? 1 : page.selected + 1;
        currentQuery.page = pageSelected;

        Router.push({
            pathname: this.props.pathname,
            query: currentQuery,
        });
    };

    render() {
        const renderAlbums = this.props.albums.map((item) => {
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
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        activeClassName={'active'}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        initialPage={this.props.currentPage - 1}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={10}
                        pageRangeDisplayed={10}
                        onPageChange={this.paginationHandler}
                    />
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToList: (albumId, albumName, albumArtist, imageSrc) =>
            dispatch(
                addToTopTenList(albumId, albumName, albumArtist, imageSrc)
            ),
    };
};

Albums.propTypes = {
    albums: PropTypes.array,
    total: PropTypes.number,
    offset: PropTypes.number,
    currentPage: PropTypes.number,
    pageCount: PropTypes.number,
    pathname: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(Albums);
