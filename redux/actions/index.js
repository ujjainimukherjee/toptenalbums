//Action Types
export const ADD_TO_TOPTENLIST = 'ADD_TO_TOPTENLIST';
export const ORDER_LIST = 'ORDER_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const TOPTENLIST_UPDATED = 'TOPTENLIST_UPDATED';
export const ALBUM_DELETED = 'ALBUM_DELETED';
export const ALBUM_SAVED_ERROR = 'ALBUM_SAVED_ERROR';
export const ALBUM_ADDED = 'ALBUM_ADDED';
export const LOAD_ALBUMS = 'LOAD_ALBUMS';
export const LOAD_ALBUMS_SUCCESS = 'LOAD_ALBUMS_SUCCESS';

export const setInitialState = (albums) => ({
    type: SET_INITIAL_STATE,
    albums,
});

export const addToTopTenList = (albumId, albumName, albumArtist, imageSrc) => ({
    type: ADD_TO_TOPTENLIST,
    albumId,
    albumName,
    albumArtist,
    imageSrc,
});

export const orderList = (oldIndex, newIndex) => ({
    type: ORDER_LIST,
    oldIndex,
    newIndex,
});

export const deleteItem = (id) => ({
    type: DELETE_ITEM,
    id,
});

export const albumSavedError = (error) => {
    return {
        type: ALBUM_SAVED_ERROR,
        error: error,
    };
};

export const loadAlbums = () => {
    return { type: LOAD_ALBUMS };
};

export const loadAlbumsSuccess = (data)  => {
    return {
        type: LOAD_ALBUMS_SUCCESS,
        data
    };
}
