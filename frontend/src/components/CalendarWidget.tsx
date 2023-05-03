import { Calendar } from 'react-calendar';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';

const StyledContainer = styled.div`
	background-color: ${Colors.MintCream};
	border-radius: 20px;
	border: solid 2px ${Colors.Blue};
	box-shadow: 2px 2px 15px ${Colors.Cambridge};
	width: 100%;
	flex-grow: 2;
`;

export const CalendarWidget = () => {
	return (
		<StyledContainer>
			<Calendar>Calendar</Calendar>
		</StyledContainer>
	);
};
