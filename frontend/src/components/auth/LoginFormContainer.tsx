import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import { LoginForm } from './LoginForm';

export type LoginFormContainerProps = {
	backgroundColor?: string;
	width?: string;
	height?: string;
};

const StyledContainer = styled.div<LoginFormContainerProps>`
	background-color: ${({ backgroundColor }) => backgroundColor || `${Colors.MintCream}`};
	box-shadow: 0px 0px 15px 1px ${({ backgroundColor }) => backgroundColor || `${Colors.MintCream}`};
	border-radius: 25px;
	width: ${({ width }) => width || '50%'};
	height: ${({ height }) => height || '70%'};
	display: flex;

	form {
		width: 80%;
		margin: auto;
	}
`;

const LoginFormContainer = (props: LoginFormContainerProps) => {
	return (
		<StyledContainer
			backgroundColor={props.backgroundColor}
			width={props.width}
			height={props.height}
		>
			<LoginForm />
		</StyledContainer>
	);
};

export default LoginFormContainer;
