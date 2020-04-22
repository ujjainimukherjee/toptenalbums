import { put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import * as actionTypes from './actions';

const API = 'http://localhost:3000/api/toptenalbums';
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

function* loadTopTenAlbums() {
    try {
        const json = yield fetch(API).then(response => response.json());
        yield put({ type: actionTypes.LOAD_ALBUMS_SUCCESS, json });
    } catch (err) {
        yield put({ type: actionTypes.ALBUM_MANIPULATION_ERROR, err });
    }
}

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
        }).then(response => response.json());
        yield put({ type: actionTypes.ALBUM_ADDED, json });
    } catch (error) {
        yield put({ type: actionTypes.ALBUM_MANIPULATION_ERROR, error });
    }
}

function* deleteAlbum(action) {
    try {
        const json = yield fetch(`${API}/${action.id}`, {
            method: 'DELETE',
            headers,
        }).then(response => response.json());
        yield put({ type: actionTypes.ALBUM_DELETED, json });
    } catch (error) {
        yield put({ type: actionTypes.ALBUM_MANIPULATION_ERROR, error });
    }
}


function* reorderAlbums(action) {
    try {
        const json = yield fetch(API, {
            method: 'PUT',
            headers,
            body: JSON.stringify({oldIndex: action.oldIndex, newIndex: action.newIndex})
        }).then(response => response.json());
        yield put({ type: actionTypes.LIST_ORDERED_COMPLETED, json });
    } catch (error) {
        yield put({ type: actionTypes.ALBUM_MANIPULATION_ERROR, error });
    }
}

function* loadAlbumsDataWatcher() {
    yield takeLatest(actionTypes.LOAD_ALBUMS, loadTopTenAlbums);
}

function* addAlbumWatcher() {
    yield takeLatest(actionTypes.ADD_TO_TOPTENLIST, addAlbumToList);
}

function* deleteAlbumWatcher() {
    yield takeEvery(actionTypes.DELETE_ITEM, deleteAlbum);
}

function* reorderAlbumsWatcher() {
    yield takeLatest(actionTypes.ORDER_LIST, reorderAlbums);
}

export default function* () {
    yield all([
        loadAlbumsDataWatcher(),
        addAlbumWatcher(),
        deleteAlbumWatcher(),
        reorderAlbumsWatcher()
    ]);
}
