import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import data from './data.js'; // 긴 코드는 export / import
import DetailedPage from './DetailedPage.jsx';
import MainPage from './MainPage.jsx';
// react-router-dom 
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  // 서버에서 가져온 데이터 가정
  // import된 데이터 사용
  let [shoes, setShoes] = useState(data);

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

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes}></MainPage>}></Route>
        <Route path="/detail/:id" element={<DetailedPage shoes={shoes}></DetailedPage>}></Route>
        <Route path="/about" element={<div>about page </div>}></Route>

      </Routes>

    </div>

  )
}

export default App
