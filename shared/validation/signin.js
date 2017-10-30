import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};

	if(Validator.isEmpty(data.username)) {
		errors.username = 'this field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}