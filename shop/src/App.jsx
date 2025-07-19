import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

function App() {

  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeMarker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Categories</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'>

      </div>

      <Container>
        <Row>
          <Col>
            <img className='shoeImage' src='/airforce.png' />
            <h4>상품명</h4>
            <p>상품정보</p>
          </Col>

          <Col>
            <img className='shoeImage' src='/superstar.png' />
            <h4>상품명</h4>
            <p>상품정보</p>
          </Col>

          <Col>
            <img className='shoeImage' src='/newbalance.png' />
            <h4>상품명</h4>
            <p>상품정보</p>
          </Col>
        </Row>
      </Container>
    </div>

  )
}

export default App
