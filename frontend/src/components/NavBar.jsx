import React from 'react';
import { Button, Navbar, NavDropdown, Nav, Form } from 'react-bootstrap';

const NavBar = props => {
    if (sessionStorage.getItem('user') != null) {
        return <NavbarAuth />
    } else {
        return <NavBarNoAuth />
    }
}

const NavbarAuth = props => {
    function logout() {
        sessionStorage.removeItem('user');

        window.location.href = '/';
    }

    return(
        <div>
            <Navbar bg="light" expand="lg"> 
                <Navbar.Brand href="/">Tutor Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="posts">Jobs</Nav.Link>
                <Nav.Link href="#link">Reviews</Nav.Link>
                <NavDropdown title="" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Tutors</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Tutees</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Leaderboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="contact">Contact Us</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <NavDropdown title={sessionStorage.getItem('user')} id="basic-nav-dropdown">
                    <NavDropdown.Item href="dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item className="btn btn-link" type="button" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const NavBarNoAuth = props => {
    return(
        <div>
            <Navbar bg="light" expand="lg"> 
                <Navbar.Brand href="/">Tutor Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="posts">Jobs</Nav.Link>
                <Nav.Link href="#link">Reviews</Nav.Link>
                <NavDropdown title="" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Tutors</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Tutees</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Leaderboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="contact">Contact Us</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form inline>
                    <Button variant="outline-success" href="login">Login</Button>
                    <Button variant="outline-success" href="signup">Sign Up</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;
