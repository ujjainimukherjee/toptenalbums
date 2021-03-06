import React from 'react';
import Router from 'next/router';
import Head from 'next/head';


function Search() {
    let textInput = null;
    const redirectToSearch = (e) => {
        e.preventDefault();
        Router.push({
            pathname: '/albums',
            query: { searchValue: textInput.value },
        });
    };

    return (
        // TODO: validation of input and sanitize the input
        <div className="search__albums__wrapper">
            <form className="search__form">
                <input
                    type="text"
                    ref={(input) => {
                        textInput = input;
                    }}
                    placeholder="Please enter search item .."
                />
                <button type="submit" onClick={(e) => redirectToSearch(e)}>
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;
