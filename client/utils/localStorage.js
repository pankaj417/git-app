export function getLocalStorage(key) {
	return localStorage.getItem(key)
}
export function setLocalStorage(key, value) {
	return localStorage.setItem(key: value)
}
export function getLoginLocalStorage() {
	return localStorage.getItem('login');
}
export function setLoginLocalStorage(value) {
	return localStorage.setItem('login', value);
}
export function getIssuesSequence(login) {
	return JSON.parse(localStorage.getItem(login));
}
export function setIssuesSequence(login, value) {
	return localStorage.setItem(login, JSON.stringify(value));
}