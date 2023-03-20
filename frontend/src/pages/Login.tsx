import styled from 'styled-components';
import LoginFormContainer from '../components/LoginFormContainer';
import { Colors } from '../utils/Colors';

const PageContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

export function Login() {
	return (
		<PageContainer>
			<LoginFormContainer backgroundColor={`${Colors.SlateGray}`} height='35%' width='35%' />
		</PageContainer>
	);
}
