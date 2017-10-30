import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class RepoList extends React.Component {
    render () {
        const repos = this.props.repos.map(repo => {
            return (
                <Link key={repo.id} to={`/${repo.name}`} className="list-group-item">{repo.name}</Link>
            )
        });
        const component = this.props.repos.length>0? repos : 'No Repo Found'
        return (
            <div>
                <h2>Repositories</h2>
                <div className="list-group">
                    {repos}
                </div>
            </div>
        )
        
    }
}
RepoList.propTypes = {
    repos: PropTypes.array.isRequired
}

export default RepoList;