import styled from 'styled-components';
import { CalendarWidget } from './CalendarWidget';
import { VehicleTree } from './VehicleTree';
import { Colors } from '../../utils/Colors';

const DashboardContainer = styled.div`
	display: flex;

	height: 100vh;
`;

const DashboardRightContainer = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 0.7em;
	padding-top: 0.2em;
	padding: 0.3em 0.3em 0em 0.3em;
	flex-grow: 2;

	.alertSection {
		background-color: ${Colors.MintCream};
		flex-grow: 1;
		border-radius: 20px;
		border: solid 2px ${Colors.Blue};
		box-shadow: 2px 2px 15px ${Colors.Cambridge};
	}
`;

export const Home = () => {
	return (
		<DashboardContainer>
			<VehicleTree />
			<DashboardRightContainer>
				<section className='alertSection'>alerts</section>
				<CalendarWidget />
			</DashboardRightContainer>
		</DashboardContainer>
	);
};
