//Action Types
export const ADD_TO_TOPTENLIST = 'ADD_TO_TOPTENLIST';
export const ORDER_LIST = 'ORDER_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE'


//Action Creator
export const setInitialState = (albums) => ({
   type: SET_INITIAL_STATE,
   albums
});


export const addToTopTenList = (albumId, albumName, albumArtist, imageSrc) => ({
   type: ADD_TO_TOPTENLIST,
   albumId,
   albumName,
   albumArtist,
   imageSrc
});


export const orderList = (oldIndex, newIndex) => ({
   type: ORDER_LIST,
   oldIndex,
   newIndex
});

export const deleteItem = id => ({
   type: DELETE_ITEM,
  id

})