import styled from 'styled-components';
import LoginFormContainer from '../components/LoginFormContainer';
import { Colors } from '../utils/Colors';

const LandingContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 60vh;
	width: 65vw;
	background-color: ${Colors.Charcoal};
	box-shadow: 2px 2px 15px 1px ${Colors.Cambridge};
	border-radius: 25px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
`;

const BrandingContainer = styled.div`
	max-width: 20em;
    max-height: 25%;
	margin: 1em 3em;
    overflow: hidden;
	h1 {
		color: ${Colors.Cambridge}};
	}

    h4 {
		color: ${Colors.Blue}};
	}
`;

export function LandingPage() {
	return (
		<LandingContainer>
			<BrandingContainer>
				<h1>Bronco Corral</h1>
				<h4>Manage your fleet with ease</h4>
			</BrandingContainer>
			<LoginFormContainer />
		</LandingContainer>
	);
}
