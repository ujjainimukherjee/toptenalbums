import { ADD_TO_TOPTENLIST } from '../actions';

const initialState = {
    topTenAlbums : []
}

const albumReducer = (state = initialState, action) => {
    let newAlbum
    switch (action.type) {
        case ADD_TO_TOPTENLIST:
            newAlbum = {
                albumId: action.albumId,
                albumName: action.albumName,
                albumArtist: action.albumArtist,
                imageSrc: action.imageSrc
            }
            return {...state, topTenAlbums: state.topTenAlbums.concat(newAlbum)};
        default:
            return state;
    }
};

export default albumReducer;