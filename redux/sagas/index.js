// TODO: see how you can handle errors inside the saga

import { put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions';

const API = 'http://localhost:3000/api/toptenalbums';
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

function* addAlbumToList(action) {
    const newAlbum = {
        albumId: action.albumId,
        albumName: action.albumName,
        albumArtist: action.albumArtist,
        imageSrc: action.imageSrc,
    };
    try {
        const json = yield fetch(API, {
            method: 'POST',
            headers,
            body: JSON.stringify(newAlbum),
        }).then((response) => response.json());
        yield put({ type: actionTypes.ALBUM_ADDED, json });
    } catch (error) {
        yield put({ type: actionTypes.ALBUM_SAVED_ERROR, error });
        console.log(`Error adding a new album ${error.message}`);
    }
}

function* deleteAlbum(action){
   console.log('my id is ', action)
   
   try {
      const json = yield fetch(`${API}/${action.id}`, {
         method : 'DELETE',
         headers,
       }).then(response => response.json());
       console.log('album d3eleted')
      yield put({ type: actionTypes.ALBUM_DELETED, json });
   } catch(error){
      yield put({ type: actionTypes.ALBUM_SAVED_ERROR, error });
      console.log(`Error removing a new album ${error.message}`);
   }
}

function* reorderTopTenList(action){
   try {
      const json = yield fetch(`${API}/${action.val.id}`, {
         method : 'PUT',
         headers,
         body : JSON.stringify({ status:action.val.status })
       }).then(response => response.json());
      if (json.type === 'error'){
         throw new Error('Could not update the todo item');
      } else {
         yield put({ type: actionTypes.TOPTENLIST_UPDATED, json });
      }
   } catch(error){
      yield put({ type: actionTypes.ALBUM_SAVED_ERROR, error });
      console.log(`Error adding a new album ${error.message}`);
   }
}

function* addAlbumWatcher() {
    yield takeLatest(actionTypes.ADD_TO_TOPTENLIST, addAlbumToList);
}

function* deleteAlbumWatcher(){
   yield takeEvery(actionTypes.DELETE_ITEM, deleteAlbum);
}

function* reorderToptenListWatcher(){
   yield takeEvery(actionTypes.ORDER_LIST, reorderTopTenList);
}

// delete
// re order
export default function* () {
    yield all([
       addAlbumWatcher(),
       deleteAlbumWatcher(),
       reorderToptenListWatcher()
      ]);
}
