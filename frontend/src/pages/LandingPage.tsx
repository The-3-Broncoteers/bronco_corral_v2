import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const LandingContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 3px solid green;
	height: 60vh;
	width: 65vw;
`;

export function LandingPage() {
	return (
		<LandingContainer>
			<Row>
				<Col sm={8}>sm=8</Col>
				<Col sm={4}>sm=4</Col>
			</Row>
		</LandingContainer>
	);
}
