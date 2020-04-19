/**
 * Notes: URLSearchParams will not work in IE
 * Polyfill https://www.npmjs.com/package/url-search-params-polyfill 
 * may be used
 */

 // fetch more data , set the state
 //componnetdidmount then make async call
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addToTopTenList  } from '../../redux/actions';
import PropTypes from 'prop-types';
import Thumbnail from '../../components/Thumbnail';


class Albums extends Component {

    state = {
        offset: 0,
        hasMore: true
    }

    static async getInitialProps({ query }) {
        try {
            const API = 'http://localhost:3000/api/SearchAllAlbums?';
            let url = API + new URLSearchParams({
                search:`${query.searchValue}`,
                offset: 0,
                limit: 30 })
            const res = await fetch(url)
            const json = await res.json();
            // console.log('get init state ', json)
            return { albums: json };
           
        } catch (error) {
            return {
                statusCode: error.response ? error.response.status : 500,
            };
        }
    }

    async makeNextCall(){
        // console.log(' I AM MAKING CALL', this.state.offset)
        if (this.state.offset > 589){
            return;
        }
        let json
        // offset is intial state offset + 31
        const API = 'http://localhost:3000/api/SearchAllAlbums?';
            let url = API + new URLSearchParams({
                search:`mike`,
                offset: this.state.offset,
                limit: 30 })
                try {
                    const res = await fetch(url)
                    // console.log('ERROR CODE', res.statusCode)
                    json = await res.json();
                    // console.log('I GOT JSON ', json)

                }catch(err){
                    // console.log('GETTING ERRIR')
                }
           
            console.log('THE JSON ', json)

            // let json = {
            //     data: [1,2]
            //     }
                
            //     let prevState = { albums: {
            //     data: [3,4]
            //     }}
            //     console.log(prevState)
                
            //     let newstate = {...prevState, albums: 
            //     {...prevState.albums, data:  prevState.albums.data.concat(json.data)}};
            //     console.log(newstate)
            // this.setState({albums: json})
            // https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react

            // this.setState(prevState => {
            //     console.log('prevState ', prevState)
            //     let newstate = {...prevState, albums: 
            //         {...prevState.albums, data:  prevState.albums.data.concat(json.data)}};
            //         return newstate;
            //             albums: {...prevState, albums: prevState.albums.data.concat(json.data) }

            // });
            // this.setState({ albums: { ...this.state.albums, data: this.state.albums.data.concat(json.data)} });
                // noyt wirking
                // console.log('OLD STATE ', this.state.albums.data.concat(json.data))
            // this.setState(prevState => ({
            //     albums: {...prevState.albums, data: prevState.albums.data.concat(json.data) }
            //   }));
// console.log('my datat', this.state.albums.data.concat(json.data))
let newalbums = {...this.state.albums}
newalbums.data = this.state.albums.data.concat(json.data);
console.log(newalbums)
            //   this.setState(prevState => ({
            //     albums: {
            //         ...prevState.albums,
            //         data: {
            //             ...prevState.albums.data.concat(json.data)
            //         }
            //     }
            // }))
            this.setState({albums: newalbums})

    }

    fetchMoreData = () => {
        if (this.state.offset > 250){
            this.setState({ hasMore: false });
            return;
        }
        this.setState(prevState => ({
            offset: prevState.offset + 30,
            albums: this.props.albums
          }));
    //    console.log('FETCHING MORE DATA', this.props)
    //    
    };


    componentDidUpdate(prevProps, prevState){
        console.log('component is updating', this.state.albums)
        if (prevState.offset !== this.state.offset){
            this.makeNextCall()
        }
        // console.log('prev state', prevState)
        // console.log('curr state', this.state)
        // console.log('prev props', prevProps)
        // console.log('curr props', this.props)
    }

    render() {
        // console.log('rendering again props', this.props)
        // console.log('rendering again state', this.state)

        let albumsData;
        let hasMore;
        if (this.state.albums){
            albumsData = this.state.albums;
            hasMore = true
        }else{
            albumsData = this.props.albums
             hasMore = this.state.hasMore
 
        }

        // FORMAT OF this.props
        // this.props.albums.data: {
        //     arr[], addToList
        // }
        // console.log('MY ALBUMS DARTA', albumsData)
        const renderAlbums = albumsData.data.map((item) => {
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
                        {/* <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll> */}
                     <InfiniteScroll
          dataLength={albumsData.data.length}
          next = {this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <ul className="albums__grid">{renderAlbums}</ul> 
                        </InfiniteScroll> 
                    </div>
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
            )
    };
};

Albums.propTypes = {
    albums: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(Albums);
