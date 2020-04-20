/** Notes:
 * The top tem albums list should be server side rendered, i.e,
 * loaded from inside 'getInitialProps'
 * but load the data from inside 'componentDidMount'
 * bcz I was having issues with the HTML being rendered by the browser * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import { orderList, deleteItem, setInitialState } from '../redux/actions';
import TopTen from '../components/TopTen';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps() {
        try {
            const res = await fetch('http://localhost:3000/api/toptenalbums');
            const albums = await res.json();
            console.log('TOP TEN ALBUMS', albums)
            return {
                albums: albums
            };
        } catch (error) {
            console.log('TOP TEN ALBUMS ERROR', error)
            return {
                statusCode: error.response ? error.response.status : 500,
            };
        }
    }

    render() {
        return (
            <TopTen
                data={this.props.albums.toptenalbums}
                onSortEnd={this.props.orderList}
                onDelete={this.props.onDelete}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInitialState: albums => {
            dispatch(setInitialState(albums));
        },
        orderList: ({ oldIndex, newIndex }) => {
            dispatch(orderList(oldIndex, newIndex));
        },
        onDelete: (id) => {
            dispatch(deleteItem(id));
        },
    };
};

export default connect(null, mapDispatchToProps)(Home);
