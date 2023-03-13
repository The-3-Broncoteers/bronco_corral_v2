import styled from 'styled-components';
import { LoginForm } from '../components/LoginForm';

//TODO set up themes replace siteColors with theme color
const tempColor: string = '#422407';

const LandingContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 60vh;
	width: 65vw;
	background-color: #edf0f5;
	box-shadow: 2px 2px 15px 1px ${tempColor};
	border-radius: 25px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
`;

//TODO media queries for h1/h4 small phone sizes
//Make h1 shrink text to fit one line
//h4 can dissappear
const BrandingContainer = styled.div`
	max-width: 20em;
    max-height: 25%;
	margin: 1em 3em;
    overflow: hidden;

	h1 {
        color: ${tempColor}}; 
    }
    
	h4 {
		color: ${tempColor}};
	}
`;

export function LandingPage() {
	return (
		<LandingContainer>
			<BrandingContainer>
				<h1>Bronco Corral</h1>
				<h4>Manage your fleet with ease</h4>
			</BrandingContainer>
			<LoginForm />
		</LandingContainer>
	);
}
