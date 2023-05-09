/**
 * Preforms basic form validation prior to submitting it to the server.
 * This will check if email is of valid structure, passwords do not have whitespace,
 * and if a confirmPassword is provided, it must match password after both are sanitized.
 * @param formData the data to validate
 * @returns a string if the form has invalid inputs, otherwise null
 */
export const validateForm = (formData: {
	email: string;
	password: string;
	confirmPassword?: string;
}): string | null => {
	if (!validateEmail(formData.email) || isBlank(formData.email)) {
		return 'Please provide a valid email address.';
	}

	const sanitizedPassword: string = removeWhitespace(formData.password);
	let sanitizedPasswordConfirm: string;

	if (typeof formData.confirmPassword === 'string') {
		sanitizedPasswordConfirm = removeWhitespace(formData.confirmPassword);

		if (sanitizedPasswordConfirm !== sanitizedPassword) {
			return 'Please ensure passwords match.';
		}
	}

	if (isBlank(sanitizedPassword)) {
		return 'Please provide a valid password.';
	}

	return null;
};

/**
 * Remove whitespace from a string.
 * @param str string to check
 * @returns string with all whitespace removed, including leading and trailing
 */
export const removeWhitespace = (str: string): string => str.replace(/\s+/g, '');

/**
 * This will filter out any email address that is not structured like so _@_._
 *
 * *Thanks ChatGPT for the sexy regex*
 *
 * @param email address to match against regex
 * @returns
 */
export const validateEmail = (email: string) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

/**
 * Checks if a string exsist and has at least 1 character
 * @param str string to check
 * @returns a boolean. true if string length is greater than 1, otherwise false.
 */
export const isBlank = (str: string): boolean => str.length < 1 || !str;

/**
 *
 * @param length length to check for
 * @param str string to check
 * @returns a boolean. true if string length is greater than or equal to length.
 */
export const isLength = (length: number, str: string): boolean => str.length >= length;

export function validateVIN(vin: string): boolean {
	if (vin.length !== 17) {
		return false;
	}

	console.log('test 1');

	if (!/^[a-zA-Z0-9]+$/.test(vin)) {
		return false;
	}

	console.log('test 2');

	const vis = vin.substring(9);
	if (!/^[a-zA-Z0-9]+$/.test(vis)) {
		return false;
	}

	console.log('test 3');

	return true;
}
