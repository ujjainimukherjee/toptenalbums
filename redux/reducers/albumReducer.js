import { ADD_TO_TOPTENLIST, ORDER_LIST, DELETE_ITEM, SET_INITIAL_STATE } from '../actions';
import {arrayMove} from 'react-sortable-hoc';

const initialState = {
    topTenAlbums : []
}

const albumReducer = (state = initialState, action) => {
    let newAlbum
    let filteredAlbums
    switch (action.type) {
        case SET_INITIAL_STATE:
            return {...state, topTenAlbums:action.albums};
        case ADD_TO_TOPTENLIST:
            newAlbum = {
                albumId: action.albumId,
                albumName: action.albumName,
                albumArtist: action.albumArtist,
                imageSrc: action.imageSrc
            }
            return {...state, topTenAlbums: state.topTenAlbums.concat(newAlbum)};
        case ORDER_LIST:
            return {
                ...state,
                topTenAlbums: arrayMove(state.topTenAlbums, action.oldIndex, action.newIndex)
            }  
            case DELETE_ITEM:
                filteredAlbums = state.topTenAlbums.filter(el => {
                    if (el.albumId !== action.id){
                        return el
                    }
                })
                return {
                    ...state,
                    topTenAlbums: filteredAlbums
                }        
        default:
            return state;
    }
};

export default albumReducer;