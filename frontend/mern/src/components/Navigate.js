import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { usercontext } from '../App';
import '../css/Navigate.css'

function Navigate() {
  const { state } = useContext(usercontext)
  if (state) {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" className="ecommerce-brand">
            <img
              src="https://i.postimg.cc/4ncqS21r/logo.png"
              alt="MY E-Commerce Logo"
              className="ecommerce-logo"
            />
          </Navbar.Brand>



          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/Logout"}>Logout</Nav.Link>
              <Nav.Link as={Link} to={"/Cart"}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  } else {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" className="ecommerce-brand">
            <img
              src="https://i.postimg.cc/4ncqS21r/logo.png"
              alt="MY E-Commerce Logo"
              className="ecommerce-logo"
            />
          </Navbar.Brand>



          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/Register"}>Register</Nav.Link>
              <Nav.Link as={Link} to={"/Login"}>Login</Nav.Link>
              <Nav.Link as={Link} to={"/Cart"}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

}

export default Navigate;
