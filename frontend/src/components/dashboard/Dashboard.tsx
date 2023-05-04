import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';

const StyledDiv = styled.div`
	background-color: ${Colors.White};
	flex-grow: 1;
`;

type DashboardProps = {
	component: React.ReactNode;
};

export const Dashboard: React.FC<DashboardProps> = ({ component }) => {
	return <StyledDiv>{component}</StyledDiv>;
};
