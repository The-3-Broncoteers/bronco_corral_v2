import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
	let wrapper;
	const onCloseMock = jest.fn();

	beforeEach(() => {
		wrapper = shallow(<SignupForm isOpen={true} onClose={onCloseMock} />);
	});

	afterEach(() => {
		onCloseMock.mockClear();
	});

	it('should render without errors', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('should update state when email input is changed', () => {
		const emailInput = wrapper.find('input[name="email"]');
		emailInput.simulate('change', {
			target: { name: 'email', value: 'test@example.com' },
		});
		expect(wrapper.state('formData').email).toBe('test@example.com');
	});

	it('should submit the form when Sign Up button is clicked', () => {
		const form = wrapper.find('form');
		const spy = jest.spyOn(form.instance(), 'handleSubmit');
		form.find('button[type="submit"]').simulate('click');
		expect(spy).toHaveBeenCalled();
	});
});
