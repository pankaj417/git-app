import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessages';
import signin from './reducers/signin';

export default combineReducers({
	flashMessages,
	signin
})