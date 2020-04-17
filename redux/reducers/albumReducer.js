import { SET_INITIAL_STATE, ALBUM_SAVED_ERROR, TOPTENLIST_UPDATED, ALBUM_DELETED } from '../actions';
import { arrayMove } from 'react-sortable-hoc';
import {
    ERROR_MORE_THAN_TEN_RECORDS,
    MAX_NO_ALBUMS,
    ERROR_RECORD_ALREADY_ADDED,
} from '../../constants';

const initialState = {
    topTenAlbums: [],
    error: '',
};

const albumReducer = (state = initialState, action) => {
    let newAlbum;
    let filteredAlbums;
    let albumFound;
    switch (action.type) {
        case SET_INITIAL_STATE:
            return { ...state, topTenAlbums: action.albums };
        case ALBUM_ADDED:
            // if user tries to add more than 10 albums, throw error
            if (state.topTenAlbums.length === MAX_NO_ALBUMS) {
                return { ...state, error: ERROR_MORE_THAN_TEN_RECORDS };
            }
            // if user is trying to add the same album twice, throw error
            albumFound = state.topTenAlbums.find((item) => {
                return item.albumId === action.albumId;
            });
            if (albumFound) {
                return { ...state, error: ERROR_RECORD_ALREADY_ADDED };
            }
            newAlbum = {
                albumId: action.albumId,
                albumName: action.albumName,
                albumArtist: action.albumArtist,
                imageSrc: action.imageSrc,
            };
            return {
                ...state,
                topTenAlbums: state.topTenAlbums.concat(newAlbum),
            };
        case TOPTENLIST_UPDATED:
            return {
                ...state,
                topTenAlbums: arrayMove(
                    state.topTenAlbums,
                    action.oldIndex,
                    action.newIndex
                ),
            };
        case ALBUM_DELETED:
            filteredAlbums = state.topTenAlbums.filter((el) => {
                if (el.albumId !== action.id) {
                    return el;
                }
            });
            return { ...state, topTenAlbums: filteredAlbums };
        case ALBUM_SAVED_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default albumReducer;
