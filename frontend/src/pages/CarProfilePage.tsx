import styled from 'styled-components';
import CarProfileForm from '../components/CarProfileForm';
import LoginFormContainer from '../components/auth/LoginFormContainer';
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

export function CarProfilePage() {
	return (
		<PageContainer>
			<CarProfileForm />
		</PageContainer>
	);
}
