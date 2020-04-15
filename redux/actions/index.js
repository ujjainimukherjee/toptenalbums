//Action Types
export const ADD_TO_TOPTENLIST = 'ADD_TO_TOPTENLIST';


//Action Creator
export const addToTopTenList = (albumId, albumName, albumArtist, imageSrc) => ({
   type: ADD_TO_TOPTENLIST,
   albumId,
   albumName,
   albumArtist,
   imageSrc
});