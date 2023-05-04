import { Calendar } from 'react-calendar';
import styled from 'styled-components';
import '../styles/Calendar.css';

const StyledContainer = styled.div`
	width: 100%;
	flex-grow: 1;
`;

export const CalendarWidget = () => {
	return (
		<StyledContainer>
			<Calendar>Calendar</Calendar>
		</StyledContainer>
	);
};
