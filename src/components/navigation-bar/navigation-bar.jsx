import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          {!loggedIn ? (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
