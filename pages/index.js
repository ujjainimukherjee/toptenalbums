import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderList, deleteItem, setInitialState } from '../redux/actions';
import albums from './toptenalbums';
import TopTen from '../components/TopTen';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toptenList: this.props.albums,
        };
    }

    componentDidMount() {
        this.props.setInitialState(albums);
    }

    render() {
        return (
            <TopTen
                data={this.props.toptenList}
                onSortEnd={this.props.orderList}
                onDelete={this.props.onDelete}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
