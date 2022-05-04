import {combineReducers} from 'redux';
import addFormReducer from './reducers/addReducer';
import editFormReducer from './reducers/editReducer';
export default combineReducers({
    addFormReducer,
    editFormReducer
})