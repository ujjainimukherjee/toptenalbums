import albumReducer from './albumReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    toptenList: albumReducer
});

export default rootReducer;