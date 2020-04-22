import { arrayMove } from 'react-sortable-hoc';
import {
    ALBUM_ADDED,
    ALBUM_MANIPULATION_ERROR,
    LIST_ORDERED_COMPLETED,
    ALBUM_DELETED,
    LOAD_ALBUMS_SUCCESS,
    SET_ERROR_FALSE,
} from './actions';

export const initState = {
    topTenAlbums: [],
    error: '',
};

const rootReducer = (state = initState, action) => {
    let newAlbum;
    let filteredAlbums;
    switch (action.type) {
        case LOAD_ALBUMS_SUCCESS:
            return {
                ...state,
                ...{ topTenAlbums: action.json },
            };
        case SET_ERROR_FALSE:
            return { ...state, ...{ error: '' } };

        case ALBUM_ADDED:
            if (action.json.errorMessage) {
                return { ...state, ...{ error: action.json.errorMessage } };
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
        case LIST_ORDERED_COMPLETED:
            return {
                ...state,
                ...{
                    topTenAlbums: arrayMove(
                        state.topTenAlbums,
                        action.json.oldIndex,
                        action.json.newIndex
                    ),
                },
            };
        case ALBUM_DELETED:
            filteredAlbums = state.topTenAlbums.filter((el) => {
                if (el.albumId !== action.json.albumId) {
                    return el;
                }
            });
            return {
                ...state,
                ...{ topTenAlbums: filteredAlbums },
            };
        case ALBUM_MANIPULATION_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default rootReducer;
