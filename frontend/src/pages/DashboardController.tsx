import { useState } from 'react';
import MaintRequest from '../components/MaintRequest';
import { Menu } from '../components/Menu';
import CarProfileForm from '../components/CarProfileForm';
import { Dashboard } from '../components/Dashboard';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import { Home } from '../components/Home';
import { IoHomeSharp } from 'react-icons/io5';
import { FaTruckMonster } from 'react-icons/fa';
import { GoTools } from 'react-icons/go';

const StyledContainer = styled.div`
	background-color: ${Colors.Charcoal};
	min-width: 100%;
	height: 100vh;
	display: flex;
	flex-flow: row nowrap;
`;

export const DashboardController: React.FC = () => {
	const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<Home />);

	const iconSize: number = 33;

	const menuItems = [
		{ name: 'Home', icon: <IoHomeSharp title='Home' size={iconSize} />, component: <Home /> },

		{
			name: 'Vehicles',
			icon: <FaTruckMonster title='Vehicles' size={iconSize} />,
			component: <MaintRequest />,
		},

		{
			name: 'Maintenances',
			icon: <GoTools title='Maintenances' size={iconSize} />,
			component: <CarProfileForm />,
		},
	];

	const handleItemClick = (component: React.ReactNode) => {
		setSelectedComponent(component);
	};

	return (
		<>
			<StyledContainer>
				<Menu items={menuItems} onItemClick={handleItemClick} />
				<Dashboard component={selectedComponent} />
			</StyledContainer>
		</>
	);
};
