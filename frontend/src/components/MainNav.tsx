import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { NavDropdown } from 'react-bootstrap';

export const MainNav = () => (
	<Navbar bg='dark' variant='dark' sticky='top'>
		<Container fluid>
			<Navbar.Brand href='/'>React-Bootstrap</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='me-auto'>
					<Nav.Link href='Login'>Login</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
);
