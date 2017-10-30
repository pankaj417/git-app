import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSigninRequest } from '../actions/signinActions';
import { addFlashMessage } from '../actions/flashMessages';
import validateInput from '../../shared/validation/signin';
import TextFieldGroup from './common/TextFieldGroup';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            isLoading: false,
            errors: {}
        } 
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    onChange(e){
        this.setState({'username': e.target.value});
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
        	this.setState({errors: {}, isLoading: true});
	        this.props.userSigninRequest(this.state)
	        .then(
	        	(data) => {
	        		this.setState({errors: {}, isLoading: false})
	        		this.props.addFlashMessage({
	        			type: 'success',
	        			text: `You signed in successfully. Welcome, ${data.login}`
	        		});
	        		this.context.router.push('/');
	        	},
	        	(data) => {
	        		this.setState({errors: {username: 'Please enter valid API Key'}, isLoading: false})
	        	}
	        );
        }
    }
    render () {
    	const { errors } = this.state;
        return (
            <div className="row">
                <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4">
		            <form onSubmit={this.onSubmit}>
		                <h3>Welcome to Git App!</h3>
		                <TextFieldGroup
		                	error={errors.username}
		                	label="API Key"
		                	onChange={this.onChange}
		                	value={this.state.username}
		                	field="username"
		                />
		                <div className='form-group'>
		                    <button disabled={this.state.isLoading} className='btn btn-primary btn-lg'>
		                    Submit
		                    </button>
		                </div>
		            </form>
		        </div>
		    </div>
        );
    }
}
Signin.propTypes = {
	userSigninRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
}
Signin.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, {userSigninRequest, addFlashMessage})(Signin);