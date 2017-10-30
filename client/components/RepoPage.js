import React from 'react';
import PropTypes from 'prop-types';
import RepoList from './RepoList'

class RepoPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return(
        	<div className="row">
                <div className="col-md-12 col-lg-12">
                    <RepoList repos={this.props.repos}/>
                </div>
            </div>   
        )
        
    }
}
RepoPage.propTypes = {
	repos: PropTypes.array.isRequired
}

export default RepoPage;