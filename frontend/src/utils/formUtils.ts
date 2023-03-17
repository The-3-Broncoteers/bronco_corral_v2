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
