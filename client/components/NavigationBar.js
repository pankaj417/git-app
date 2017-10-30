import React from 'react';
import {Link} from 'react-router';

export default () => {
    return (
    	<nav className="navbar navbar-default">
    		<div className="container-fluid">
    			<div className="navbar-header">
    				<a className="navbar-brand" href="/">Git App</a>
    			</div>
    			<div className="collapse navbar-collapse">
    				<ul className="nav navbar-nav navbar-right">
			            <li ><Link to="/signin">Want to Try Other User?</Link></li>
			        </ul>
    			</div>
    		</div>
    	</nav>
    );
}