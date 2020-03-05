/** useForm */
import { useState } from "react";

/**
 * @description Simple hook to handle user input & form submission
 *
 * @param {function} callback
 */
const useForm = (callback, initalValues) => {
	const [values, setValues] = useState(initalValues ? initalValues : {});

	const handleSubmit = event => {
		if (event) event.preventDefault();
		callback();
	};

	const handleChange = event => {
		if (event.target) {
			event.persist();
			setValues(values => ({
				...values,
				[event.target.name]: event.target.value
			}));
		} else {
			setValues(values => ({
				...values,
				[event.name]: event.value
			}));
		}
	};

	return {
		handleChange,
		handleSubmit,
		values
	};
};

export default useForm;
