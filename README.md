Go to git-app folder
This app will fetch  only public repos
run 'npm run server'

browse http://localhost:4000

If you want to change the port of the server, you may change in server/index.js
line number 10

User will need to enter github auth token on sigin page and when user will click on submit app is hitting github api ```https://api.github.com/user``` with auth token using redux action creator function ```userSigninRequest```.
If auth token is valid app will create local storage key named as login and set the login value of response and redirect to repositories page.

Repositories page will check for login localstorage and will make github api ```https://api.github.com/users/${login}/repos```call for fetching public repos of the signedin user using redux action creator function ```getUserRepo``` then store the result in redux state.

When user will click on any repo it will change the layout of the page and in left section it will display all repos and in right section it will display issues of the selected repo.
For fetching issues of the selected repo app takes the repo name from url and then will make github api ```https://api.github.com/repos/${login}/${name}/issues``` call using redux action creator function ```getRepoIssues``` then it checks if local storage exist with name loginName-repoName for priority order. If it is there then app just assign repo's issues in redux state else  app created local storage (for persistence to show to all user we can create table in db and store this sorting there) and then assign repo's issues in redux state.

RepoList component is responsible For displaying issues in priority order.
It checks the local storage for the same and then sort it for display. 

I have not make the app really fancy to change the priority of the issue I just added simple form which will ask for priority and when user will submit the form and it will change or set the priority in local storage. 
0 is the highest priority for this app. We can use draggable row feature to make it user friendly.

I have given a link in the header right section ```Want to Try Other User?``` through which we can change user.

* I just setup the development Server, Did not setup Production Server.

Packages used
Dev dependencies
	Babel-cli with babel-preset-es2015 to transpile ES6
	nodemon - to restart server when we change any file in specified folder
	webpack, webpack-dev-middleware, webpack-dev-server create bundle from client folder    
	babel-loader for webpack
	babel-preset-react  to make babel understand react
	react-hot-loader  to teach reach application to reload on change
	webpack-hot-middleware reload application on change


Dependencies
	Express - Node.js web application framework
	react
	prop-types
	react-dom
	shortid for generating unique ids
	validator for validating form inputs
	axios for http calls from client
	classnames for conditional applying css classes
	lodash JavaScript utility library
	react-redux
    react-router
    redux
    redux-thunk



