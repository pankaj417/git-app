import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Main from './components/Main';
import Signin from './components/Signin';

export default (
    <Route path="/" component={App}>
    	<IndexRoute component={Main}/>
    	<Route path="signin" component={Signin}/>
    	<Route path=':name' component={Main}/>
    </Route>
)