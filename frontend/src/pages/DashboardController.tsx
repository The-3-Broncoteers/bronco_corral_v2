import { useState } from 'react';
import { Menu } from '../components/dashboard/Menu';
import { Dashboard } from '../components/dashboard/Dashboard';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import { Home } from '../components/dashboard/Home';
import { IoHomeSharp } from 'react-icons/io5';
import { FaTruckMonster } from 'react-icons/fa';
import { GoTools } from 'react-icons/go';
import { Vehicles } from '../components/dashboard/Vehicles';
import { Maintenances } from '../components/dashboard/Maintenances';
import { VehicleTree } from '../components/dashboard/VehicleTree';
import { VehicleContextProvider } from '../context/VehicleProvider';

const StyledContainer = styled.div`
	background-color: ${Colors.DarkBlue};
	min-width: 100%;
	height: 95vh;
	display: flex;
	flex-flow: row nowrap;
`;

export const DashboardController: React.FC = () => {
	const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<Home />);
	const [activeItem, setActiveItem] = useState<string>('Home');

	const iconSize: number = 33;

	const menuItems = [
		{ name: 'Home', icon: <IoHomeSharp title='Home' size={iconSize} />, component: <Home /> },

		{
			name: 'Vehicles',
			icon: <FaTruckMonster title='Vehicles' size={iconSize} />,
			component: <Vehicles />,
		},

		// {
		// 	name: 'Maintenances',
		// 	icon: <GoTools title='Maintenances' size={iconSize} />,
		// 	component: <Maintenances />,
		// },
	];

	const handleItemClick = (component: React.ReactNode, name: string) => {
		setSelectedComponent(component);
		setActiveItem(name);
	};

	return (
		<>
			<StyledContainer>
				<VehicleContextProvider>
					<Menu items={menuItems} onItemClick={handleItemClick} activeItem={activeItem} />
					<VehicleTree />
					<Dashboard component={selectedComponent} />
				</VehicleContextProvider>
			</StyledContainer>
		</>
	);
};
