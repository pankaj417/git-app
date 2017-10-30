import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRepo, getRepoIssues } from '../actions/signinActions';
import { getLoginLocalStorage } from '../utils/localStorage';
import RepoPage from './RepoPage'
import RepoPageWithIssues from './RepoPageWithIssues'


class Main extends Component {
	constructor(props){
        super(props);
    }
	componentWillMount() {
		const login = getLoginLocalStorage();
		if(login) {
			this.props.getUserRepo(login);
			if (this.props.params.name) {
				this.props.getRepoIssues(login, this.props.params.name);
			}
		} else {
			this.context.router.push('/signin');
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.params.name!=this.props.params.name) {
			const login = getLoginLocalStorage();
			if(login && nextProps.params.name) {
				this.props.getRepoIssues(login, nextProps.params.name);
			} 
	    }
	}
	render() {
		const component = this.props.params.name && this.props.issues  && this.props.repos? 
			<RepoPageWithIssues repos={this.props.repos} issues={this.props.issues} params={this.props.params} sortIssues={this.props.sortIssues}/>: 
			(this.props.repos)? <RepoPage repos={this.props.repos}/> : 'loading...'

		return (
			<div className="jumbotron">
				{component}
			</div>
		)
	}	
}

Main.propTypes = {
	getUserRepo: PropTypes.func.isRequired
}
Main.contextTypes = {
	router: PropTypes.object.isRequired
}
function mapStateToProps(state) {
    return {
        repos: state.signin.repos,
        issues: state.signin.issues,
        sortIssues: state.signin.sortIssues
    }
}

export default connect(mapStateToProps, {getUserRepo, getRepoIssues})(Main);