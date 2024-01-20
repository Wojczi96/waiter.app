import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

const NavBar= () => {
    return(
        <Navbar bg="primary" variant="dark" sticky="top" className="rounded mb-3">
        <Container>
          <Navbar.Brand href="/">Waiter App</Navbar.Brand>
            <Nav className="justify-content-end">
                <Nav.Link as={NavLink} to="/">
                    Home
                </Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    );
}

export default NavBar;