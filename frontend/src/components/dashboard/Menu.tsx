import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';

const StyledDiv = styled.div`
	background-color: ${Colors.DarkBlue};
	position: relative;
	min-width: 12vw;
	display: flex;
	flex-direction: column;
	gap: 0.9em;
	padding-top: 1%;
	align-items: stretch;

	.menu-item {
		background-color: ${Colors.Cambridge};
		cursor: pointer;
		color: ${Colors.MintCream};
		text-align: center;

		&:hover {
			background-color: ${Colors.Cambridge};
			color: ${Colors.MintCream};
		}

		&.active {
			background-color: ${Colors.Blue};
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
	onItemClick: (component: React.ReactNode, name: string) => void;
	activeItem: string;
};

export const Menu: React.FC<MenuProps> = ({ items, onItemClick, activeItem }) => {
	return (
		<StyledDiv>
			{items.map((item, index) => (
				<div
					key={index}
					className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
					onClick={() => onItemClick(item.component, item.name)}
				>
					{item.icon} <span>{item.name}</span>
				</div>
			))}
		</StyledDiv>
	);
};
