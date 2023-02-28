import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

//TODO Change login linked based on if user is signed in or not
export const MainNav = () => (
	<>
		<Navbar bg='dark' variant='dark'>
			<Container fluid>
				<LinkContainer to='/home'>
					<Navbar.Brand>Bronco Corral</Navbar.Brand>
				</LinkContainer>
				<Nav>
					<LinkContainer to='/login'>
						<Nav.Link>Login</Nav.Link>
					</LinkContainer>
				</Nav>
			</Container>
		</Navbar>
		<Outlet></Outlet>
	</>
);
