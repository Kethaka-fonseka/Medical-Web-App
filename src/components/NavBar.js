import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {

    const logOut = () => {
        alert("logout successfully")
        window.localStorage.removeItem("username");
        window.location.href = "/login"
    }
  return (
    <>
    <Navbar bg="primary" variant="dark" className='mb-6'>
      <Container>
        <Navbar.Brand href="#home">ABC Hospital</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Contact Us</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>   
            <Nav.Link eventKey={2} onClick={logOut}>
              Log Out
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>

  </>
  )
}
