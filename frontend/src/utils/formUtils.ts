export const validateForm = (formData: { email: string; password: string }): string | null => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!formData.email.match(emailRegex) || !formData.email) {
		return 'Please provide a valid email address.';
	}

	if (!formData.password) {
		return 'Please provide a valid password.';
	}

	return null;
};

/**
 * Remove whitespace from a string.
 * @param input string to check
 * @returns string with all whitespace removed
 */
export const removeWhitespace = (input: string) => input.replace(/\s+/g, '');

/**
 * This will filter out any email address that is not structured like so _@_._
 *
 * *Thanks ChatGPT*
 *
 * @param email address to match against regex
 * @returns
 */
export const validateEmail = (email: string) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

/**
 * Remove whitespace from a string.
 * @param input string to check
 * @returns string with all whitespace removed
 */
export const validateInput = (input: string) => input != null;
