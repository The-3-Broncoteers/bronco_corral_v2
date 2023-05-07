import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import logo from '../styles/Bronco_Corral.png';
import styled from 'styled-components';
import { FaAlignJustify } from 'react-icons/fa';
import { Colors } from '../utils/Colors';
import { useContext } from 'react';
import AuthContext from '../context/authProvider';
import { axiosPrivate } from '../config/axiosConfig';

const StyledNavbar = styled(Navbar)`
	height: 5vh;
`;

const StyledButton = styled.button`
	color: ${Colors.MintCream};
	background-color: rgb(33, 37, 41);
	border: none;
`;

const logoutEndPoint: string = '/logout';
//TODO Change login linked based on if user is signed in or not
export const MainNav = () => {
	const { auth } = useContext(AuthContext);

	const logOut = async () => {
		try {
			const res = await axiosPrivate.get(logoutEndPoint, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.accessToken,
				},
			});
		} catch (err) {
			console.log(err);
		}
		console.log('logout: ' + auth.accessToken);
	};

	return (
		<>
			<StyledNavbar bg='dark' variant='dark'>
				<Container fluid>
					<LinkContainer to='/home'>
						<Navbar.Brand>
							<img src={logo} alt='' width='40' height='30' className='pe-2'></img>
							Bronco Corral
						</Navbar.Brand>
					</LinkContainer>
					<Nav>
						<LinkContainer to='/'>
							<StyledButton onClick={logOut} className='outline-primary'>
								Log Out
							</StyledButton>
						</LinkContainer>
					</Nav>
				</Container>
			</StyledNavbar>
			<Outlet></Outlet>
		</>
	);
};
