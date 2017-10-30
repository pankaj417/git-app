import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import _ from 'lodash'
import TextFieldGroup from './common/TextFieldGroup';
import validateInput from '../../shared/validation/order';
import { updateOrder } from '../actions/signinActions';


class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openForm: false,
            changeOrderFor: '',
            order: 0,
            errors: {}, 
            isLoading: false,
            name: this.props.params.name
        }
        this.changeOrder = this.changeOrder.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeOrder = this.onChangeOrder.bind(this)
        this.cancelOrder = this.cancelOrder.bind(this)
    }
    changeOrder(e) {
        this.setState({
            changeOrderFor: e.target.name,
            order: e.target.value,
            openForm: true
        })
    }
    cancelOrder() {
        this.setState({
            'changeOrderFor': ''
        })
    }
    onChangeOrder(e) {
        this.setState({
            'order': e.target.value
        })
    }
    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if(!isValid) {
            this.setState({ errors })
        }
        return isValid;
    }

    onSubmit(e){
        e.preventDefault();
        if(this.isValid()) {
            this.setState({errors: {}, isLoading: true, openForm: false});
            this.props.updateOrder(this.state);
        }
    }
    getList(issues) {
        return issues.map((issue, key) => {
             const sortOrder = (issue.sortOrder) ? issue.sortOrder : 0 ;
            let changeOrder = ''
            if(this.state.changeOrderFor == issue.id && this.state.openForm) {
                changeOrder =  (
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                error={this.state.errors.order}
                                label="order"
                                onChange={this.onChangeOrder}
                                value={this.state.order}
                                field="order"
                            />
                            <button  name={issue.id} className="btn btn-success btn-xs" >Submit</button>&nbsp;
                            <button type="button" name={issue.id} className="btn btn-danger btn-xs" onClick={this.cancelOrder}>Cancel</button>
                        </form>
                    </div>
                )
            } else {
                changeOrder = (
                    <div>
                        <br/>
                        <button value={sortOrder} type="button" name={issue.id} className="btn btn-success btn-xs" onClick={this.changeOrder}>ChangeOrder</button>
                        &nbsp;
                        <span className="badge">
                            { sortOrder }
                        </span>
                    </div>
                )
            }
            return (
                <li key={issue.id}  className="list-group-item">{issue.title} - {issue.body}
                    &nbsp; {changeOrder}
                </li>
            )
        });
    }
    render () {
        if(this.props.issues.length==0) {
            return (
                <div>
                    <h2>Issues of {this.props.params.name}</h2>
                    <ul className="list-group">
                        No Issue Found
                    </ul>
                </div>
            )
        }
        let existedIssues = this.props.issues.filter((issue)=> {
            if(this.props.sortIssues[issue.id] || this.props.sortIssues[issue.id] == 0) {
                issue.sortOrder = this.props.sortIssues[issue.id];
                return issue
            }
        })
        const sortedExistedIssues = _.sortBy(existedIssues, ['sortOrder']);
        const newIssues = this.props.issues.filter((issue)=> {
            if(!this.props.sortIssues[issue.id] && this.props.sortIssues[issue.id]!=0) {
                return issue
            }
        })
        const existedIssuesComponent = this.getList(sortedExistedIssues) 
        const newIssuesIssuesComponent = this.getList(newIssues) 
        return (
            <div>
                <h2>Issues of {this.props.params.name}</h2>
                <ul className="list-group">
                    {newIssuesIssuesComponent}
                    {existedIssuesComponent}
                </ul>
            </div>
        )
        
    }
}
IssueList.propTypes = {
    issues: PropTypes.array.isRequired,
    sortIssues: PropTypes.object.isRequired,
    updateOrder: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
}


export default connect(null, {updateOrder})(IssueList);
