import React from 'react';
import PropTypes from 'prop-types';
import RepoList from './RepoList'
import IssueList from './IssueList'

class RepoPagWithIssues extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return(
        	<div className="row">
                <div className="col-md-4 col-lg-4">
                    <RepoList repos={this.props.repos}/>
                </div>
                <div className="col-md-8 col-lg-8">
                    <IssueList params={this.props.params} issues={this.props.issues} sortIssues={this.props.sortIssues}/>
                </div>
            </div>   
        )
    }
}
RepoPagWithIssues.propTypes = {
	repos: PropTypes.array.isRequired,
    issues: PropTypes.array.isRequired,
    sortIssues: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
}

export default RepoPagWithIssues;