import React, { Component } from 'react';
import Router from 'next/router';
import { Input } from 'antd';
//import 'antd/dist/antd.css';

class TopTen extends Component {
    redirectToSearch(val) {
        Router.push({
            pathname: '/albums',
            query: { searchValue: val },
        });
    }

    render() {
        const { Search } = Input;
        return (
            <div>
                <Search
                    id="searchAlbums"
                    placeholder="Please enter albums/artists to search"
                    onSearch={(val) => this.redirectToSearch(val)}
                    style={{ width: 200 }}
                    aria-label="Please enter search value"
                />
            </div>
        );
    }
}

export default TopTen;
