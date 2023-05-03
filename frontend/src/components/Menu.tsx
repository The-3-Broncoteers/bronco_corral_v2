import React from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';

const StyledDiv = styled.div`
	background-color: ${Colors.DarkBlue};
	position: relative;
	min-width: 12vw;

	.menu-container {
		min-width: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9em;
		margin: 0em 0.7em;
		align-items: stretch;
	}

	.menu-item {
		background-color: ${Colors.White};
		border-radius: 2px;
		cursor: pointer;
	}
`;

type MenuItem = {
	name: string;
	icon: React.ReactNode;
	component: React.ReactNode;
};

type MenuProps = {
	items: MenuItem[];
	onItemClick: (component: React.ReactNode) => void;
};

export const Menu: React.FC<MenuProps> = ({ items, onItemClick }) => {
	return (
		<StyledDiv>
			<div className='menu-container'>
				{items.map((item, index) => (
					<div key={index} className='menu-item' onClick={() => onItemClick(item.component)}>
						{item.icon} <span>{item.name}</span>
					</div>
				))}
			</div>
		</StyledDiv>
	);
};
