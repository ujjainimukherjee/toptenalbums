/** Notes:
 * The top tem albums list should be server side rendered, i.e,
 * loaded from inside 'getInitialProps'
 * but load the data from inside 'componentDidMount'
 * bcz I was having issues with the HTML being rendered by the browser * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAlbums, orderList, deleteItem } from '../redux/actions';
import TopTen from '../components/TopTen';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps(props) {
        const { store , isServer } = props.ctx;
          store.dispatch(loadAlbums());
          return { isServer };
    }

    render() {
        return (
            <TopTen
                data={this.props.toptenalbums}
                onSortEnd={this.props.orderList}
                onDelete={this.props.onDelete}
            />
        );
    }
}



const mapStateToProps = state => {
    return {
        toptenalbums: state.topTenAlbums
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        orderList: ({ oldIndex, newIndex }) => {
            dispatch(orderList(oldIndex, newIndex));
        },
        onDelete: (id) => {
            dispatch(deleteItem(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
