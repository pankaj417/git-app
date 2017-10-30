import { GIT_SIGNIN, SET_REPOS, SET_ISSUES, SET_ISSUES_SEQUENCE } from '../actions/types';

export default (state = {}, action ={}) => {
	switch(action.type){
		case GIT_SIGNIN:
			return Object.assign({}, state, {
					user: action.data
				}
			);
		case SET_REPOS:
			return Object.assign({}, state, {
					repos: action.data
				}
			);
		case SET_ISSUES:
			return Object.assign({}, state, {
					issues: action.data
				}
			);
		case SET_ISSUES_SEQUENCE:
			return Object.assign({}, state, {
					sortIssues: action.data
				}
			);
		default: return state;
	}
}