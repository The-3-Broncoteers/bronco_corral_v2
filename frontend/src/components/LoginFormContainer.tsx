import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import LoginForm from './LoginForm';

const StyledContainer = styled.div`
	position: relative;
	background-color: ${Colors.MintCream};
	box-shadow: 2px 2px 15px 1px ${Colors.MintCream};
	border-radius: 25px;
	height: 70%;
	width: 50%;

	form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
	}
`;

const LoginFormContainer = () => {
	return (
		<StyledContainer>
			<LoginForm />
		</StyledContainer>
	);
};

export default LoginFormContainer;
