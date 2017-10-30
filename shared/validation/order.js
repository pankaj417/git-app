import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};
	if(Validator.isEmpty(data.order)) {
		errors.order = 'this field is required';
	} else if(!Validator.isNumeric(data.order)) {
		errors.order = 'Please enter numeric value';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}