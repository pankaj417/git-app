import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { GIT_SIGNIN, SET_REPOS, SET_ISSUES, SET_ISSUES_SEQUENCE } from '../actions/types';
import { setLoginLocalStorage, getIssuesSequence, setIssuesSequence, getLoginLocalStorage } from '../utils/localStorage';

export function userSigninRequest(userData) {
	return dispatch => {
		dispatch(setUserRepos([]));
		setAuthorizationToken(userData.username);
		return axios.get(`https://api.github.com/user`).then(res => {
				setLoginLocalStorage(res.data.login);
				return res.data;
			}
		)
	}
}
export function setUserDetail(userData) {
	return {
		type: GIT_SIGNIN,
		data: userData
	}
}

export function setUserRepos(list) {
	return {
		type: SET_REPOS,
		data: list
	}
}

export function getUserRepo(login) {
	return dispatch => {
		return axios.get(`https://api.github.com/users/${login}/repos`).then(res => {
			dispatch(setUserRepos(res.data));
		})
	}
}
export function setRepoIssues(list) {
	return {
		type: SET_ISSUES,
		data: list
	}
}
export function setIssuesSeq(repoList) {
	return {
		type: SET_ISSUES_SEQUENCE,
		data: repoList
	}
}
export function updateOrder(data) {
	return dispatch => {
		const login = getLoginLocalStorage();
		const repoList =  getIssuesSequence(`${login}-${data.name}`);
		if(!repoList) {
			var sortIssueList = {};
			sortIssueList[data.changeOrderFor] = data.order;
			setIssuesSequence(`${login}-${data.name}`, sortIssueList);
			dispatch(setIssuesSeq(sortIssueList));
		}  else {
			repoList[data.changeOrderFor] = data.order;
			setIssuesSequence(`${login}-${data.name}`, repoList);
			dispatch(setIssuesSeq(repoList));
		}
	}
}


export function getRepoIssues(login, name) {
	return dispatch => {
		return axios.get(`https://api.github.com/repos/${login}/${name}/issues`).then(res => {
			const repoList =  getIssuesSequence(`${login}-${name}`);
			if(!repoList) {
				var sortIssueList = {};
				for (var i = 0; i < res.data.length; i++) {
					sortIssueList[res.data[i].id] = i;
				}
				setIssuesSequence(`${login}-${name}`, sortIssueList);
				dispatch(setIssuesSeq(sortIssueList));
			}  else {
				dispatch(setIssuesSeq(repoList));
			}
			dispatch(setRepoIssues(res.data));
		})
	}
}
