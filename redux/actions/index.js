//Action Types
export const ADD_TO_TOPTENLIST = 'ADD_TO_TOPTENLIST';
export const ORDER_LIST = 'ORDER_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';




//Action Creator
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