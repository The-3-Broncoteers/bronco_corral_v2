import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';

const StyledDiv = styled.div`
	background-color: ${Colors.MintCream};
	border-right: 2px solid ${Colors.DarkBlue};
	position: relative;
	min-width: 12vw;
	display: flex;
	flex-direction: column;
	gap: 0.9em;
	padding-top: 1%;
	align-items: stretch;

	.menu-item {
		background-color: ${Colors.MintCream};
		cursor: pointer;

		&:hover {
			background-color: ${Colors.Cambridge};
			color: ${Colors.MintCream};
		}

		&.active {
			background-color: ${Colors.DarkBlue};
			color: ${Colors.MintCream};
		}
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
